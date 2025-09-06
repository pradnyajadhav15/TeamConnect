import React, { useEffect, useRef, useState, useCallback } from 'react';
import io from "socket.io-client";
import { Badge, IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
import server from '../environment';
import './VideoMeetComponent.css'; // Import the new CSS file

const server_url = server;

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
};

export default function VideoMeetComponent() {
    const socketRef = useRef();
    const socketIdRef = useRef();
    const localVideoref = useRef();
    const connections = useRef({});
    const videoRef = useRef([]);
    
    const [videoAvailable, setVideoAvailable] = useState(true);
    const [audioAvailable, setAudioAvailable] = useState(true);
    const [video, setVideo] = useState(true);
    const [audio, setAudio] = useState(true);
    const [screen, setScreen] = useState(false);
    const [showModal, setModal] = useState(true);
    const [screenAvailable, setScreenAvailable] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [newMessages, setNewMessages] = useState(0);
    const [askForUsername, setAskForUsername] = useState(true);
    const [username, setUsername] = useState("");
    const [videos, setVideos] = useState([]);
    const [hoverStates, setHoverStates] = useState({
        joinButton: false,
        controlButton: false,
        endCallButton: false,
        closeChatButton: false,
        sendButton: false
    });

    const createBlackSilence = useCallback(() => {
        const canvas = Object.assign(document.createElement("canvas"), { width: 640, height: 480 });
        canvas.getContext('2d').fillRect(0, 0, 640, 480);
        const videoStream = canvas.captureStream();
        
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const dst = oscillator.connect(ctx.createMediaStreamDestination());
        oscillator.start();
        ctx.resume();
        
        const audioTrack = Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
        const videoTrack = Object.assign(videoStream.getVideoTracks()[0], { enabled: false });
        
        return new MediaStream([videoTrack, audioTrack]);
    }, []);

    const getPermissions = useCallback(async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            setVideoAvailable(!!videoPermission);
            
            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            setAudioAvailable(!!audioPermission);
            
            setScreenAvailable(!!navigator.mediaDevices.getDisplayMedia);

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: videoAvailable, 
                    audio: audioAvailable 
                });
                
                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch (error) {
            console.error("Permission error:", error);
        }
    }, [videoAvailable, audioAvailable]);

    const updatePeerConnections = useCallback((stream) => {
        for (let id in connections.current) {
            if (id === socketIdRef.current) continue;

            try {
                connections.current[id].addStream(stream);
                connections.current[id].createOffer().then((description) => {
                    connections.current[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections.current[id].localDescription }));
                        })
                        .catch(e => console.error("Set local description error:", e));
                }).catch(e => console.error("Create offer error:", e));
            } catch (e) {
                console.error("Update peer connection error:", e);
            }
        }
    }, []);

    const getUserMediaSuccess = useCallback((stream) => {
        try {
            if (window.localStream) {
                window.localStream.getTracks().forEach(track => track.stop());
            }
        } catch (e) { 
            console.error("Stop previous stream error:", e);
        }

        window.localStream = stream;
        if (localVideoref.current) {
            localVideoref.current.srcObject = stream;
        }

        updatePeerConnections(stream);

        stream.getTracks().forEach(track => {
            track.onended = () => {
                setVideo(false);
                setAudio(false);
                handleTrackEnded();
            };
        });
    }, [updatePeerConnections]);

    const getDislayMediaSuccess = useCallback((stream) => {
        try {
            if (window.localStream) {
                window.localStream.getTracks().forEach(track => track.stop());
            }
        } catch (e) { 
            console.error("Stop previous stream error:", e);
        }

        window.localStream = stream;
        if (localVideoref.current) {
            localVideoref.current.srcObject = stream;
        }

        updatePeerConnections(stream);

        stream.getTracks().forEach(track => {
            track.onended = () => {
                setScreen(false);
                handleTrackEnded();
                getUserMedia();
            };
        });
    }, [updatePeerConnections]);

    const handleTrackEnded = useCallback(() => {
        try {
            if (localVideoref.current && localVideoref.current.srcObject) {
                const tracks = localVideoref.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        } catch (e) { 
            console.error("Stop tracks error:", e);
        }

        window.localStream = createBlackSilence();
        if (localVideoref.current) {
            localVideoref.current.srcObject = window.localStream;
        }

        updatePeerConnections(window.localStream);
    }, [createBlackSilence, updatePeerConnections]);

    const getDislayMedia = useCallback(() => {
        if (screen && navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                .then(getDislayMediaSuccess)
                .catch((e) => console.error("Display media error:", e));
        }
    }, [screen, getDislayMediaSuccess]);

    const getUserMedia = useCallback(() => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .catch((e) => console.error("User media error:", e));
        } else {
            try {
                if (localVideoref.current && localVideoref.current.srcObject) {
                    const tracks = localVideoref.current.srcObject.getTracks();
                    tracks.forEach(track => track.stop());
                }
            } catch (e) { 
                console.error("Stop tracks error:", e);
            }
        }
    }, [video, audio, videoAvailable, audioAvailable, getUserMediaSuccess]);

    const gotMessageFromServer = useCallback((fromId, message) => {
        try {
            const signal = JSON.parse(message);

            if (fromId !== socketIdRef.current) {
                if (signal.sdp) {
                    connections.current[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                        if (signal.sdp.type === 'offer') {
                            connections.current[fromId].createAnswer().then((description) => {
                                connections.current[fromId].setLocalDescription(description).then(() => {
                                    socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections.current[fromId].localDescription }));
                                }).catch(e => console.error("Set local description error:", e));
                            }).catch(e => console.error("Create answer error:", e));
                        }
                    }).catch(e => console.error("Set remote description error:", e));
                }

                if (signal.ice) {
                    connections.current[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.error("Add ICE candidate error:", e));
                }
            }
        } catch (e) {
            console.error("Message processing error:", e);
        }
    }, []);

    const addMessage = useCallback((data, sender, socketIdSender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, data: data, timestamp: new Date(), id: Date.now() + Math.random() }
        ]);
        
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    }, []);

    const connectToSocketServer = useCallback(() => {
        socketRef.current = io.connect(server_url, { secure: false });

        socketRef.current.on('signal', gotMessageFromServer);

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', window.location.href);
            socketIdRef.current = socketRef.current.id;

            socketRef.current.on('chat-message', addMessage);

            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id));
                if (connections.current[id]) {
                    delete connections.current[id];
                }
            });

            socketRef.current.on('user-joined', (id, clients) => {
                clients.forEach((socketListId) => {
                    connections.current[socketListId] = new RTCPeerConnection(peerConfigConnections);
                    
                    connections.current[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }));
                        }
                    };

                    connections.current[socketListId].onaddstream = (event) => {
                        setVideos(prevVideos => {
                            const videoExists = prevVideos.find(video => video.socketId === socketListId);
                            
                            if (videoExists) {
                                return prevVideos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                            } else {
                                return [...prevVideos, {
                                    socketId: socketListId,
                                    stream: event.stream,
                                    autoplay: true,
                                    playsinline: true
                                }];
                            }
                        });
                    };

                    if (window.localStream) {
                        connections.current[socketListId].addStream(window.localStream);
                    } else {
                        connections.current[socketListId].addStream(createBlackSilence());
                    }
                });

                if (id === socketIdRef.current) {
                    for (let id2 in connections.current) {
                        if (id2 === socketIdRef.current) continue;

                        try {
                            if (window.localStream) {
                                connections.current[id2].addStream(window.localStream);
                            }
                            
                            connections.current[id2].createOffer().then((description) => {
                                connections.current[id2].setLocalDescription(description)
                                    .then(() => {
                                        socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections.current[id2].localDescription }));
                                    })
                                    .catch(e => console.error("Set local description error:", e));
                            }).catch(e => console.error("Create offer error:", e));
                        } catch (e) {
                            console.error("Connection setup error:", e);
                        }
                    }
                }
            });
        });
    }, [gotMessageFromServer, addMessage, createBlackSilence]);

    const handleVideo = useCallback(() => {
        setVideo(!video);
    }, [video]);

    const handleAudio = useCallback(() => {
        setAudio(!audio);
    }, [audio]);

    const handleScreen = useCallback(() => {
        setScreen(!screen);
    }, [screen]);

    const handleEndCall = useCallback(() => {
        try {
            if (localVideoref.current && localVideoref.current.srcObject) {
                const tracks = localVideoref.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        } catch (e) {
            console.error("Stop tracks error:", e);
        }
        
        // Clean up connections
        for (let id in connections.current) {
            try {
                connections.current[id].close();
            } catch (e) {
                console.error("Close connection error:", e);
            }
        }
        connections.current = {};
        
        if (socketRef.current) {
            socketRef.current.disconnect();
        }
        
        window.location.href = "/";
    }, []);

    const sendMessage = useCallback(() => {
        if (message.trim() && socketRef.current) {
            socketRef.current.emit('chat-message', message.trim(), username);
            setMessage("");
        }
    }, [message, username]);

    const connect = useCallback(() => {
        if (username.trim()) {
            setAskForUsername(false);
            // FIXED: Replaced getMedia() with the correct function calls
            setVideo(videoAvailable);
            setAudio(audioAvailable);
            getUserMedia();
            connectToSocketServer();
        }
    }, [username, videoAvailable, audioAvailable, getUserMedia, connectToSocketServer]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            if (askForUsername) {
                connect();
            } else {
                sendMessage();
            }
        }
    }, [askForUsername, connect, sendMessage]);

    const handleMouseEnter = (buttonName) => {
        setHoverStates(prev => ({ ...prev, [buttonName]: true }));
    };

    const handleMouseLeave = (buttonName) => {
        setHoverStates(prev => ({ ...prev, [buttonName]: false }));
    };

    const getButtonStyle = (baseStyle, hoverStyle, buttonName) => {
        return hoverStates[buttonName] 
            ? { ...baseStyle, ...hoverStyle } 
            : baseStyle;
    };

    useEffect(() => {
        getPermissions();
        
        // Cleanup function
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            for (let id in connections.current) {
                try {
                    connections.current[id].close();
                } catch (e) {
                    console.error("Close connection error:", e);
                }
            }
        };
    }, [getPermissions]);

    useEffect(() => {
        getUserMedia();
    }, [video, audio, getUserMedia]);

    useEffect(() => {
        getDislayMedia();
    }, [screen, getDislayMedia]);

    return (
        <div className="video-meet-container">
            {askForUsername ? (
                <div className="video-meet-modal">
                    <div className="video-meet-modal-content">
                        <h2 className="video-meet-modal-title">Enter into Lobby</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="video-meet-username-input"
                            autoFocus
                        />
                        <button 
                            onClick={connect} 
                            onMouseEnter={() => handleMouseEnter('joinButton')}
                            onMouseLeave={() => handleMouseLeave('joinButton')}
                            className="video-meet-join-button"
                            disabled={!username.trim()}
                        >
                            Connect
                        </button>
                    </div>
                </div>
            ) : (
                <div className="video-meet-meeting-container">
                    {showModal && (
                        <div className="video-meet-chat-panel">
                            <div className="video-meet-chat-header">
                                <h3>Chat</h3>
                                <button 
                                    onClick={() => setModal(false)} 
                                    onMouseEnter={() => handleMouseEnter('closeChatButton')}
                                    onMouseLeave={() => handleMouseLeave('closeChatButton')}
                                    className="video-meet-close-chat-button"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="video-meet-chat-messages">
                                {messages.length > 0 ? (
                                    messages.map((item) => (
                                        <div key={item.id} className="video-meet-message">
                                            <div className="video-meet-message-sender">{item.sender}</div>
                                            <div className="video-meet-message-text">{item.data}</div>
                                            <div className="video-meet-message-time">
                                                {item.timestamp.toLocaleTimeString()}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="video-meet-no-messages">No messages yet</div>
                                )}
                            </div>
                            <div className="video-meet-chat-input-container">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="video-meet-chat-input"
                                />
                                <button 
                                    onClick={sendMessage} 
                                    onMouseEnter={() => handleMouseEnter('sendButton')}
                                    onMouseLeave={() => handleMouseLeave('sendButton')}
                                    className="video-meet-send-button"
                                    disabled={!message.trim()}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="video-meet-video-grid">
                        <div className="video-meet-video-container">
                            <video 
                                ref={localVideoref} 
                                autoPlay 
                                muted 
                                className="video-meet-video-element"
                            />
                            <div className="video-meet-video-overlay">
                                <span className="video-meet-username">{username} (You)</span>
                                <div className="video-meet-media-status">
                                    {!video && <span className="video-meet-status-icon">🎥</span>}
                                    {!audio && <span className="video-meet-status-icon">🎤</span>}
                                </div>
                            </div>
                        </div>

                        {videos.map((video) => (
                            <div key={video.socketId} className="video-meet-video-container">
                                <video
                                    ref={ref => {
                                        if (ref && video.stream) {
                                            ref.srcObject = video.stream;
                                        }
                                    }}
                                    autoPlay
                                    playsInline
                                    className="video-meet-video-element"
                                />
                                <div className="video-meet-video-overlay">
                                    <span className="video-meet-username">User {video.socketId.slice(0, 6)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="video-meet-controls">
                        <button 
                            onClick={handleVideo} 
                            onMouseEnter={() => handleMouseEnter('controlButton')}
                            onMouseLeave={() => handleMouseLeave('controlButton')}
                            className={`video-meet-control-button ${!video ? 'inactive' : ''}`}
                        >
                            {video ? '🎥' : '❌🎥'} Video
                        </button>
                        <button 
                            onClick={handleAudio} 
                            onMouseEnter={() => handleMouseEnter('controlButton')}
                            onMouseLeave={() => handleMouseLeave('controlButton')}
                            className={`video-meet-control-button ${!audio ? 'inactive' : ''}`}
                        >
                            {audio ? '🎤' : '❌🎤'} Audio
                        </button>
                        {screenAvailable && (
                            <button 
                                onClick={handleScreen} 
                                onMouseEnter={() => handleMouseEnter('controlButton')}
                                onMouseLeave={() => handleMouseLeave('controlButton')}
                                className={`video-meet-control-button ${screen ? 'active-screen-share' : ''}`}
                            >
                                {screen ? '🖥️' : '❌🖥️'} Screen
                            </button>
                        )}
                        <button 
                            onClick={() => setModal(!showModal)} 
                            onMouseEnter={() => handleMouseEnter('controlButton')}
                            onMouseLeave={() => handleMouseLeave('controlButton')}
                            className="video-meet-control-button"
                        >
                            💬 Chat {newMessages > 0 && `(${newMessages})`}
                        </button>
                        <button 
                            onClick={handleEndCall} 
                            onMouseEnter={() => handleMouseEnter('endCallButton')}
                            onMouseLeave={() => handleMouseLeave('endCallButton')}
                            className="video-meet-end-call-button"
                        >
                            📞 End Call
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
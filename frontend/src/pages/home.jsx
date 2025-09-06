import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField } from '@mui/material';
import {
  Restore as RestoreIcon,
  History as HistoryIcon,
  ExitToApp as ExitToAppIcon,
  VideoCall as VideoCallIcon
} from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import './HomeComponent.css'; // We'll create this CSS file

function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    const handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) {
            alert("Please enter a meeting code");
            return;
        }
        
        try {
            await addToUserHistory(meetingCode.trim());
            navigate(`/${meetingCode.trim()}`);
        } catch (error) {
            console.error("Error joining meeting:", error);
            alert("Failed to join meeting. Please try again.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleJoinVideoCall();
        }
    };

    const handleStartNewMeeting = () => {
        const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        navigate(`/${randomCode}`);
    };

    return (
        <div className="home-container">
            {/* Navigation Bar */}
            <nav className="home-nav">
                <div className="nav-brand">
                    <VideoCallIcon className="brand-icon" />
                    <h2>TeamConnect</h2>
                </div>

                <div className="nav-actions">
                    <IconButton 
                        onClick={() => navigate("/history")}
                        className="history-button"
                        title="Meeting History"
                        aria-label="Meeting History"
                    >
                        <HistoryIcon />
                    </IconButton>
                    
                    <Button 
                        onClick={handleLogout}
                        className="logout-button"
                        startIcon={<ExitToAppIcon />}
                        aria-label="Logout"
                    >
                        Logout
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="home-main">
                <div className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Premium Quality 
                            <span className="accent-text"> Video Calls</span>
                        </h1>
                        
                        <p className="hero-subtitle">
                            Connect with crystal clear audio and video quality for your meetings and education needs
                        </p>

                        <div className="join-meeting-container">
                            <TextField 
                                value={meetingCode}
                                onChange={(e) => setMeetingCode(e.target.value)}
                                onKeyPress={handleKeyPress}
                                label="Enter Meeting Code"
                                variant="outlined"
                                className="meeting-input"
                                placeholder="e.g., ABC-DEF-GHI"
                                fullWidth
                            />
                            
                            <Button 
                                onClick={handleJoinVideoCall}
                                variant="contained"
                                className="join-button"
                                disabled={!meetingCode.trim()}
                                size="large"
                            >
                                Join Meeting
                            </Button>
                        </div>

                        <div className="divider">
                            <span>OR</span>
                        </div>

                        <div className="action-buttons">
                            <Button 
                                variant="contained"
                                onClick={handleStartNewMeeting}
                                className="new-meeting-button"
                                startIcon={<VideoCallIcon />}
                                size="large"
                            >
                                Start New Meeting
                            </Button>
                        </div>
                    </div>
                    
                    <div className="hero-visual">
                        <img 
                            src="/logo3.png" 
                            alt="Video Call Illustration" 
                            className="hero-image"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                        <div className="image-fallback" style={{display: 'none'}}>
                            <VideoCallIcon className="fallback-icon" />
                            <p>Video Call</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default withAuth(HomeComponent);
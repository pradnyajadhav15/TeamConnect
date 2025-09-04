import { Server } from "socket.io";

// keep track of connections, messages, and time online
const connections = {};
const messages = {};
const timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // adjust in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    // when user joins a call
    socket.on("join-call", (path) => {
      if (!connections[path]) {
        connections[path] = [];
      }
      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      // notify others in the same room
      connections[path].forEach((id) => {
        io.to(id).emit("user-joined", socket.id, connections[path]);
      });
    });

    // handle signal for WebRTC
    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    // chat messages
    socket.on("chat-message", (data, sender) => {
      let matchingRoom = null;

      // find the room that this socket belongs to
      for (const [roomKey, members] of Object.entries(connections)) {
        if (members.includes(socket.id)) {
          matchingRoom = roomKey;
          break;
        }
      }

      if (matchingRoom) {
        if (!messages[matchingRoom]) {
          messages[matchingRoom] = [];
        }

        const newMessage = {
          sender,
          data,
          socketId: socket.id,
          timestamp: new Date(),
        };

        messages[matchingRoom].push(newMessage);

        console.log("messages", matchingRoom, ":", sender, data);

        // broadcast message to everyone in the room
        connections[matchingRoom].forEach((id) => {
          io.to(id).emit("chat-message", newMessage);
        });
      }
    });

    // handle disconnect
    socket.on("disconnect", () => {
      const joinTime = timeOnline[socket.id];
      const diffTime = joinTime ? Math.abs(new Date() - joinTime) : 0;

      console.log(`User ${socket.id} disconnected. Online for ${diffTime / 1000}s`);

      for (const [roomKey, members] of Object.entries(connections)) {
        if (members.includes(socket.id)) {
          // notify others in the room
          members.forEach((id) => {
            io.to(id).emit("user-left", socket.id);
          });

          // remove user from room
          connections[roomKey] = members.filter((id) => id !== socket.id);

          if (connections[roomKey].length === 0) {
            delete connections[roomKey];
          }
        }
      }

      delete timeOnline[socket.id];
    });
  });

  return io;
};

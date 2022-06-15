require("dotenv").config();
const express = require('express');
const cors = require('cors');
const dbConnect = require("./config/mongo");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const socket = require("socket.io");

const app = express();
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});


dbConnect();

const io = socket(port, {
    cors: {
        origin: "*",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} connected`);
    })
socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
        socket.to(sendUserSocket).emit("receive-msg", data.msg);
    }
});

});
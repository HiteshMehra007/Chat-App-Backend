import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
const httpServer = http.createServer(app);

app.use(cors());

// Websocket Server - wss
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`a user has connected.`);

    socket.on('chat message', (msg) => {
        console.log(`Message : ${msg}`);
        io.emit('chat message' ,msg);
    })

    socket.on('disconnect', () => {
        console.log("a user disconnected.");
    })
})

httpServer.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`);
})
const api = require('./api');
const { Server } = require("socket.io");

function startServer() {
    const server = api.listen(process.env.PORT, "0.0.0.0", () => {
        console.log(`Running on port ${process.env.PORT} with ${process.env.NODE_ENV} environment`);
    });

    const io = new Server(server, { path: process.env.WEBSOCKET_PATH, cors: { origin: '*' } });

    io.on("connection", (socket) => {
        socket.on('updateEvents', () => {
            socket.broadcast.emit('syncEvents');
        })
    });
}

startServer();

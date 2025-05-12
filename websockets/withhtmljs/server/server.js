const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const socket = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
});

socket.on("connection", (socket) => {
  console.log(socket); //logs the socket object in the terminal
  socket.on("message", (message) => {
    console.log("message", message);
  });
  socket.emit("message", "hello from server");
});

httpServer.listen(3000, () => {});

const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on("user-message", (msg) => {
    io.emit("msg", msg);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});

httpServer.listen(9000, () => {
  console.log("Server is running on port 9000");
});

// open localhost:9000 in 2 browser or in 2 tabs and see the differance

const socket = io("http://localhost:3000");
socket.on("connect", (response) => {
  console.log("response");
});

socket.on("message", (msg) => {
  console.log("msg", msg);
  socket.emit("message", "Hello from client");
});

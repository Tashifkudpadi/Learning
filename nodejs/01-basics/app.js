const http = require("http");
const routes = require("./routes");
const server = http.createServer(routes);
// or
// const server = http.createServer(routes.handler);
// console.log(routes.someText);

// server.listen(3001);
// or

server.listen(3001, () => {
  console.log("server is running on port 3001");
});

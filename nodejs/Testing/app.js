const http = require("http");
const reqHandler = require("./routes");

const server = http.createServer(reqHandler);
server.listen(3000, () => {
  console.log("server is running on port 3000");
});

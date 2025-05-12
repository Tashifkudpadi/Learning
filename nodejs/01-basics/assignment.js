const http = require("http");

const server = http.createServer((req, res) => {
  const { url } = req;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Assignment</title></head>");
    res.write(
      "<body><form action='/create-user' method='POST'><input type='text' name='username'/><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
    // or without return if there are no code to execute outside of if condition. here we don't have any code to execute outside of if condition
    // res.end()
  }
  if (url === "/users") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Assignment</title></head>");
    res.write("<body><ul><li>user 1</li><li>user 2</li></ul></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1]; //username=whatever-the-user-entered
      console.log("entered name", user);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
});
server.listen(3000);

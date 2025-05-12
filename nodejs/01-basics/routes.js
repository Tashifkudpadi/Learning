const fs = require("fs");

const reqHandler = (req, res) => {
  // console.log(req.url, req.method, req.headers);
  // process.exit();

  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'/><button type='submit'>Send</button></form></body>"
    );
    res.write("</html");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[0];
      fs.writeFile("message", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/"); //redirect to home
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server.</h1></body>");
  res.write("</html");
  res.end();
};

module.exports = reqHandler;

// or

// module.exports = {
//   handler: reqHandler,
//   someText: "some hard codeed text",
// };

// or

// module.exports.handler=reqHandler
// module.exports.someText="some hard coded texts"

// or we can ommit the module just export it
// exports.handler=reqHandler
// exports.someText="some hard coded texts"

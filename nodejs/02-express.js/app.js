const http = require("http");
const express = require("express");
const app = express();

// app.use((req, res, next) => {
//   console.log("in the middleware");
//   next(); //Allows the req to continue to the next middelware in line
// });
app.use("/", (req, res, next) => {
  res.send("<h1>This always run</h1>");
  next();
});
app.use("/add-product", (req, res, next) => {
  res.send("<h1>Hello from Add-product</h1>");
});
app.use("/", (req, res, next) => {
  console.log("in the another smiddleware");
  res.send("<h1>Hello from express</h1>");
});

// const server = http.createServer(app);
// server.listen(3000);

// above lines are done in internally by express.js check below link for more
// https://github.com/expressjs/express/blob/master/lib/application.js
app.listen(3000);

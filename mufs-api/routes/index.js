const express = require("express");
require("../db/mongoose");
var router = express.Router();
const projectRouter = require("./project");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");

app.use(express.static("public"));

app.get("/", (req, res) => {
  // res.sendFile(path.join("../" + __dirname, "public/index.html"));
  res.sendFile(path.resolve("mufs-api/public/index.html"));
});

app.use(express.json());

app.use(projectRouter);

app.all("/*", (req, res, next) => {
  //Enable Cors policy for
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Method",
    "GET, PUT, POST, DELETE, OPTIONS, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.listen(port, () => {
  console.log("app is running on port 8080");
});

module.exports = router;

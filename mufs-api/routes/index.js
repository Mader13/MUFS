const express = require("express");
require("../db/mongoose");
var router = express.Router();
const projectRouter = require("../routes/project");
const app = express();

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

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/* GET home page. */

module.exports = router;

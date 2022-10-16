import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import projectRouter from "./routers/project.router";
import userRouter from "./routers/user.router";
import { dbConnect } from "./configs/database.config";
import path from "path";

dbConnect();
const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/projects", projectRouter);
app.use("/api/users", userRouter);

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Website served on port " + port);
});

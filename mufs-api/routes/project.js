const express = require("express");
const Project = require("../models/project");
const router = new express.Router();

router.get("/project", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).send(projects);
  } catch (err) {
    res.status(500).send(error);
  }
});

module.exports = router;

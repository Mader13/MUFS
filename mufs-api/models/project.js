const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  idProject: Number,
  members: Array,
  leader: Number,
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

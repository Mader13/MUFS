import { Router } from "express";
import { sample_projects } from "../data";
import asyncHandler from "express-async-handler";
import { Project, ProjectModel } from "../models/project.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { appendFile } from "fs";

const router = Router();

router.post(
  "/create-project",
  asyncHandler(async (req, res) => {
    const { title, description, leader } = req.body;
    const project = await ProjectModel.findOne({ title });
    if (project) {
      res
        .status(HTTP_BAD_REQUEST)
        .send("Проект с таким названием уже есть в MUFS");
      return;
    }

    const newProject: Project = {
      id: "",
      description,
      title,
      leader,
      members: [],
      pendingMembers: [],
    };

    const dbProject = await ProjectModel.create(newProject);
    res.send(dbProject);
  })
);

router.put("/:id", async (req, res) => {
  const { idUser } = req.body;
  // const project = await ProjectModel.findOneAndUpdate(
  //   {
  //     id: req.params.id,
  //   },
  //   {
  //     $addToSet: {
  //       pendingMembers: idUser,
  //     },
  //   },
  //   { returnNewDocument: true }
  // );

  const project = await ProjectModel.updateOne(
    { _id: req.params.id },
    { $addToSet: { pendingMembers: idUser } },
    { returnNewDocument: true }
  );

  res.send(project);
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const projects = await ProjectModel.find();
    const projectsCount = await ProjectModel.countDocuments();
    res.send(projects);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const projects = await ProjectModel.find({
      title: { $regex: searchRegex },
    });
    res.send(projects);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const project = await ProjectModel.findById(req.params.id);
    res.send(project);
  })
);

export default router;

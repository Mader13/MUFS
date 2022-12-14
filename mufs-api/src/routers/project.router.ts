import e, { Router } from "express";
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
      members: [leader],
      pendingMembers: [],
    };

    const dbProject = await ProjectModel.create(newProject);
    res.send(dbProject);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    ProjectModel.deleteOne({ _id: req.params.id }).then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Project deleted!",
      });
    });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const project = await ProjectModel.findById(req.params.id);
    res.send(project);
  })
);

router.get(
  "/:id/userSearch",
  asyncHandler(async (req, res) => {
    const project = await ProjectModel.findById(req.params.id);
    res.send(project);
  })
);

router.put("/:id/add", async (req, res) => {
  const { idUser } = req.body;
  const project = await ProjectModel.updateOne(
    { _id: req.params.id },
    { $addToSet: { pendingMembers: idUser } },
    { returnNewDocument: true }
  );

  res.send(project);
});

router.put(
  "/:id/decide",
  asyncHandler(async (req, res) => {
    const { idUser, decision } = req.body;
    console.log(idUser, "idUser");
    console.log(decision, "decision");
    switch (decision) {
      case true: {
        await ProjectModel.updateOne(
          { _id: req.params.id },
          { $pull: { pendingMembers: idUser } }
        );
        const project = await ProjectModel.updateOne(
          { _id: req.params.id },
          { $addToSet: { members: idUser } },
          { returnNewDocument: true }
        );
        console.log(project);
        res.send(project);
        break;
      }
      case false: {
        const project = await ProjectModel.updateOne(
          { _id: req.params.id },
          { $pull: { pendingMembers: idUser } },
          { returnNewDocument: true }
        );

        res.send(project);
        break;
      }
      default: {
        break;
      }
    }
  })
);
router.put(
  "/:id/deleteUser",
  asyncHandler(async (req, res) => {
    const { userID } = req.body;
    console.log(userID);
    const project = await ProjectModel.updateOne(
      { _id: req.params.id },
      { $pull: { members: userID } },
      { returnNewDocument: true }
    );
    res.send(project);
  })
);
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const projects = await ProjectModel.find();
    res.send(projects);
  })
);

router.get(
  "/count",
  asyncHandler(async (req, res) => {
    const amountProjects = await ProjectModel.countDocuments();
    res.send(amountProjects);
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

export default router;

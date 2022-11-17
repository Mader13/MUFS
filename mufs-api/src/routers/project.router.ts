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
    const { title, description, leader, faculty } = req.body;
    const project = await ProjectModel.findOne({ title });
    if (project) {
      res
        .status(HTTP_BAD_REQUEST)
        .send("Занятие с таким названием уже есть в системе");
      return;
    }

    const newProject: Project = {
      id: "",
      description,
      title,
      leader,
      members: [],
      pendingMembers: [],
      faculty,
    };

    const dbProject = await ProjectModel.create(newProject);
    res.send(dbProject);
  })
);

router.get(
  "/:id/userSearch",
  asyncHandler(async (req, res) => {
    const project = await ProjectModel.findById(req.params.id);
    res.send(project);
  })
);

router.get(
  "/faculty/:id",
  asyncHandler(async (req, res) => {
    // const { faculty } = req.body;
    console.log(req.params.id);
    const projects = await ProjectModel.find({
      faculty: req.params.id,
    });
    res.send(projects);
  })
);
router.put("/:id/add", async (req, res) => {
  const { idUser } = req.body;
  const project = await ProjectModel.updateOne(
    { _id: req.params.id },
    { $addToSet: { members: idUser } },
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

import { Router } from "express";
import { sample_projects } from "../data";
import asyncHandler from "express-async-handler";
import { ProjectModel } from "../models/project.model";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const projectsCount = await ProjectModel.countDocuments();
    if (projectsCount > 0) {
      res.send("Seed is done already");
      return;
    }

    await ProjectModel.create(sample_projects);
    res.send("Seed is done");
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

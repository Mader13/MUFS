import e, { Router } from "express";
import asyncHandler from "express-async-handler";
import { Study, StudyModel } from "../models/study.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { appendFile } from "fs";

const router = Router();

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const { title, description, leader, course, date } = req.body;

    const study = await StudyModel.findOne({ title });
    if (study) {
      res
        .status(HTTP_BAD_REQUEST)
        .send("Занятие с таким названием уже есть в системе");
      return;
    }

    const newStudy: Study = {
      id: "",
      description,
      title,
      leader,
      members: [],
      course,
      date,
    };

    const dbStudy = await StudyModel.create(newStudy);
    res.send(dbStudy);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const study = await StudyModel.findById(req.params.id);
    res.send(study);
  })
);

router.put(
  "/:id/add-user",
  asyncHandler(async (req, res) => {
    const { idUser } = req.body;
    const study = await StudyModel.updateOne(
      { _id: req.params.id },
      { $addToSet: { members: idUser } },
      { returnNewDocument: true }
    );

    res.send(study);
  })
);

export default router;

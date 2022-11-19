import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
const bcrypt = require("bcryptjs");
const router = Router();

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { idP } = req.body;
    console.log(idP, "Добавляю этот проект");
    const user = await UserModel.updateOne(
      { _id: req.params.id },
      { $addToSet: { idProject: idP } },
      { returnNewDocument: true }
    );
    console.log(user);
    res.send(user);
  })
);

router.put(
  "/:id/deleteFromProject",
  asyncHandler(async (req, res) => {
    const { idProject } = req.body;
    console.log(idProject, "Айди для удаления у пользователя");
    const user = await UserModel.updateOne(
      {
        _id: req.params.id,
      },
      {
        $pull: { idProject: idProject },
      },
      { returnNewDocument: true }
    );

    console.log("Проект удален у пользователя");
    res.send(user);
  })
);
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && bcrypt.compareSync(password, user!.password)) {
      res.send(generateTokenResponse(user));
    } else {
      const BAD_REQUEST = 400;
      res.status(BAD_REQUEST).send("Имя пользователя или пароль некорректны");
    }
  })
);

router.post(
  "/register-user",
  asyncHandler(async (req, res) => {
    const { name, email, password, skills } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res
        .status(HTTP_BAD_REQUEST)
        .send("Пользователь с данной эл. почтой уже есть в системе");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: "",
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      skills,
      userRole: 0, // создается обычный пользователь без админ. прав
      profilePicture: "",
      idProject: [],
    };

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  })
);

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      userRole: user.userRole,
    },
    "RandomText",
    {
      expiresIn: "30d",
    }
  );

  user.token = token;
  return user;
};

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    res.send(user);
  })
);

export default router;

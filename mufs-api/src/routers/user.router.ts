import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
const bcrypt = require("bcryptjs");
const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const projectsCount = await UserModel.countDocuments();
    if (projectsCount > 0) {
      res.send("Seed is done already");
      return;
    }

    await UserModel.create(sample_users);
    res.send("Seed is done");
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user || bcrypt.compareSync(password, user!.password)) {
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
      idProject: 0,
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

export default router;

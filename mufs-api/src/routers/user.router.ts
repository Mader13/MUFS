import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model";
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
    const user = await UserModel.findOne({ email, password });

    if (user) {
      res.send(generateTokenResponse(user));
    } else {
      const BAD_REQUEST = 400;
      res.status(BAD_REQUEST).send("Имя пользователя или пароль некорректны");
    }
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

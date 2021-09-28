import userModel from "../../models/users.js";

import express from "express";
import { basicAut } from "../../auth/index.js";

const userRouter = express.Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = await userModel.create(req.body);

    const { _id } = await newUser;
    res.status(201).send({ _id });
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/", basicAut, async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

export default userRouter;

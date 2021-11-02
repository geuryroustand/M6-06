import userModel from "../../models/users.js";

import express from "express";
import { basicAut } from "../../auth/index.js";

const userRouter = express.Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = await userModel.create(req.body);

    // delete newUser._doc.password;
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

userRouter.get("/me", basicAut, async (req, res, next) => {
  try {
    const user = req.user;

    const getUser = await userModel.find({ user: req.user._id.toString() });

    res.send(getUser);

    // console.log("from the user router me", req.user);
  } catch (error) {
    console.log(error);
  }
});

userRouter.put("/me", basicAut, async (req, res, next) => {
  try {
    // const userId = req.user._id;
    // req.user.name = req.body;
    // req.user.name = req.body;

    await req.user.save();
    res.send();

    // const modifiedUser = await userModel.findByIdAndUpdate(userId, req.body, {
    //   new: true,
    // });

    // if (modifiedUser) {
    //   res.send(modifiedUser);
    // } else {
    //   console.log(`User with the id ${userId} not found`);
    // }
  } catch (error) {
    console.log(error);
  }
});

export default userRouter;

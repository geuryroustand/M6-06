import express from "express";
import commentsModal from "../../models/comments.js";

const postRouter = express.Router();

postRouter.get("/", async (req, res, next) => {
  try {
    const comments = await commentsModal.find();
    res.send(comments);
  } catch (error) {
    console.log(error);
  }
});

export default postRouter;

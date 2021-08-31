import express from "express";
import bookModal from "../../models/books.js";

const bookRouter = express.Router();

bookRouter.get("/", async (req, res, next) => {
  try {
    // const data = await bookModal.find();
    console.log("===============");
  } catch (error) {}
});

// bookRouter.post("/", async (req, res, next) => {
//   // const data = await bookModal.find();
//   console.log("===============");
// });

export default bookRouter;

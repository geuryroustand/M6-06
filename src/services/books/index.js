import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import bookModal from "../../models/books.js";

const bookRouter = express.Router();

bookRouter.get("/", async (req, res, next) => {
  try {
    const book = await bookModal.find();
    res.send(book);
  } catch (error) {
    console.log(error);
  }
});
bookRouter.get("/:id", async (req, res, next) => {
  const book = await bookModal.findById(req.params.id);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send(`book not find with the ${req.params.id}`);
  }
});

const saveImgStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "books-store",
  },
});

bookRouter.post(
  "/",
  multer({ storage: saveImgStorage }).single("cover"),
  async (req, res, next) => {
    const book = await bookModal.create({ ...req.body, cover: req.file.path });
    const { _id } = book;

    res.status(201).send({ _id });
  }
);

bookRouter.put("/:id", async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await bookModal.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });

    if (book) {
      console.log(book);
      res.send(book);
    } else {
      res.status(404).send(`User with the id ${req.params.id} not found!`);
    }
  } catch (error) {
    console.log(error);
  }
});

bookRouter.delete("/:id", async (req, res, next) => {
  try {
    const book = await bookModal.findByIdAndDelete(req.params.id);

    if (book) {
      res.status(201).send("DELETED");
    } else {
      res.status(404).send(`Book with the id ${req.params.id} not found!`);
    }
  } catch (error) {
    console.log(error);
  }
});

export default bookRouter;

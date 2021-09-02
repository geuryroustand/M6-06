import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import bookModal from "../../models/books.js";
import commentModal from "../../models/comments.js";

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

bookRouter.post("/:id", async (req, res, next) => {
  try {
    // const bookId = await bookModal.findById(req.params.id);

    // const newBook = { ...bookId.toObject() };

    const addComment = await bookModal.findByIdAndUpdate(
      req.params.id,
      {
        $push: { bookComments: req.body, postedDate: new Date() },
      },
      {
        new: true,
      }
    );

    res.send(addComment);
  } catch (error) {
    console.log(error);
  }
});

bookRouter.get("/:id/comments", async (req, res, next) => {
  const getComments = await bookModal.findById(req.params.id);

  // console.log(getComments);
  res.send(getComments.bookComments);
});

bookRouter.get("/:id/comments/:commentId", async (req, res, next) => {
  const getComments = await bookModal.findById(req.params.id);

  if (getComments) {
    const getSingleComment = getComments.bookComments.find(
      (com) => com._id.toString() === req.params.commentId
    );
    res.send(getSingleComment);
  } else {
    res.send("Not found ");
  }
});

bookRouter.put("/:id/comments/:commentId", async (req, res, next) => {
  try {
    const commentEdited = await bookModal.findOneAndUpdate(
      { _id: req.params.id, "bookComments._id": req.params.commentId },
      {
        $set: {
          "bookComments.$": { ...req.body, _id: req.params.commentId },
        },
      },
      {
        new: true,
      }
    );

    res.send(commentEdited);
  } catch (error) {
    console.log(error);
  }

  // if (getComments) {
  //   const getSingleComment = getComments.bookComments.find(
  //     (com) => com._id.toString() === req.params.commentId
  //   );
  //   res.send(getSingleComment);
  // } else {
  //   res.send("Not found ");
  // }
});

export default bookRouter;

// usersRouter.get("/:userId/purchaseHistory", async (req, res, next) => {
//   try {
//     const user = await UserModel.findById(req.params.userId)

//     if (user) {
//       res.send(user.purchaseHistory)
//     } else {
//       next(createError(404, `User with id ${req.params.userId} not found!`))
//     }

//     // if(!user) return next(createError(404, `User with id ${req.params.userId} not found!`))
//     // res.send()
//   } catch (error) {
//     next(error)
//   }
// })

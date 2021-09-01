import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, "Category is mandatory"],
    },
    title: {
      type: String,
      required: [true, "Title is mandatory "],
    },
    cover: {
      type: String,
    },
    readTime: {
      value: Number,
      unit: String,
    },
    author: {
      name: String,
      avatar: String,
    },
  },
  { timestamps: true }
);

export default model("books", bookSchema);

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const commentsSchema = new Schema(
  {
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("comment", commentsSchema);

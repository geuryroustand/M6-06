import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import bookRouter from "./services/books/index.js";

const server = express();

const port = process.env.PORT;

//***********MIDDLEWARES ********************** */

// server.use(cors());
server.use(express.json());
server.use("/books", bookRouter);
//************Router ****************/

mongoose.connect(
  "mongodb+srv://geury:juliana123@cluster0.wf032.mongodb.net/books-store?retryWrites=true&w=majority"
);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to mongoDB");

  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log("server connected");
  });
});

mongoose.connection.on("error", (err) => {
  console.log("Mongo ERROR", err);
});

server.on("error", (err) => {
  console.error("Server crashed due to ", err);
});
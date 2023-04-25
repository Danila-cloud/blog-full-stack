import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  registerValidation,
  postCreateValidation,
} from "./utils/validations.js";
import checkAuth from "./utils/checkAuth.js";
import multer from "multer";

import { register, login, getMyProfile } from "./controllers/UserController.js";
import { create, getAll, getOne, remove, update, getMyPosts } from "./controllers/PostController.js";

import handleErrors from "./utils/handleErrors.js";

import cors from "cors";

const config = dotenv.config();

mongoose
  .connect(process.env.MONGOOSE_CONNECTION)
  .then(() => console.log("Connection to DB success"))
  .catch((err) => console.log("Fail connection to db: ", err));

const app = express();

app.use(express.json());
app.use(cors())

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/my-profile", checkAuth, getMyProfile);

//*********************** Auth */
app.post("/login", handleErrors, login);
app.post("/register", registerValidation, handleErrors, register);

//*********************** Post */
app.get("/posts/:id", getOne);
app.get("/posts", getAll);
app.post("/posts", checkAuth, postCreateValidation, create);
app.delete("/posts/:id", checkAuth, remove);
app.patch("/posts/:id", checkAuth, postCreateValidation, update);

app.get("/my-posts", checkAuth, getMyPosts);

app.listen(3001, (err) => {
  if (err) return console.log(err);

  console.log("server start");
});

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { registerValidation, postCreateValidation } from "./utils/validations.js";
import checkAuth from "./utils/checkAuth.js";

import { register, login, getMyProfile } from "./controllers/UserController.js";
import { create, getAll, getOne, remove, update } from "./controllers/PostController.js";

const config = dotenv.config();

mongoose
  .connect(process.env.MONGOOSE_CONNECTION)
  .then(() => console.log("Connection to DB success"))
  .catch((err) => console.log("Fail connection to db: ", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/my-profile", checkAuth, getMyProfile);

//*********************** Auth */
app.post("/login", login);
app.post("/register", registerValidation, register);


//*********************** Post */
app.get('/posts/:id', getOne);
app.get('/posts', getAll);
app.post('/posts', checkAuth, postCreateValidation, create);
app.delete('/posts/:id', checkAuth, remove);
app.patch('/posts/:id', checkAuth, update);

app.listen(3001, (err) => {
  if (err) return console.log(err);

  console.log("server start");
});

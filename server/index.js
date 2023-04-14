import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { registerValidation, postCreateValidation } from "./utils/validations.js";
import checkAuth from "./utils/checkAuth.js";

import { register, login, getMyProfile } from "./controllers/UserController.js";
import { create } from "./controllers/PostController.js";

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

app.post("/login", login);
app.post("/register", registerValidation, register);

// app.get('/posts', getAll);
// app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postCreateValidation, create);
// app.delete('/posts', remove);
// app.patch('/posts', update);

app.listen(3001, (err) => {
  if (err) return console.log(err);

  console.log("server start");
});

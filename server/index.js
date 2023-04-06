import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.post("/login", (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: "Danya",
    },
    "qwerty"
  );

  res.json({
    success: true,
    token,
  });
});

app.listen(3001, (err) => {
  if (err) return console.log(err);

  console.log("server start");
});

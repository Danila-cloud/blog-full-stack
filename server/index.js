import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";
import UserModel from "./models/User.js";
import checkAuth from "./utils/checkAuth.js";

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

app.get("/my-profile", checkAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "skubidupapa",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      ...user,
      token,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Not access",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return req.status(404).json({
        message: "User not found",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return req.status(404).json({
        message: "Login or password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "skubidupapa",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      ...user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail login, please try again",
    });
  }
});

app.post("/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "skubidupapa",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      ...user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail register, please try again",
    });
  }
});

app.listen(3001, (err) => {
  if (err) return console.log(err);

  console.log("server start");
});

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
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
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({
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
};

export const getMyProfile = async (req, res) => {
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
};

export const changeEmail = async (req, res) => {
  try {
    await UserModel.updateOne(
      { _id: req.params.id },
      { email: req.body.email }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Not access",
    });
  }
};

export const changeName = async (req, res) => {
  try {
    await UserModel.updateOne(
      { _id: req.params.id },
      { fullName: req.body.name }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Not access",
    });
  }
};

import { Request, Response } from "express";
import User from "../models/UserModel";
import { generate, verify } from "password-hash";
import { LogInUserType, UserType, mongoUser } from "../types/types";
import { Document } from "mongoose";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const signUp = (req: Request, res: Response) => {
  let { email, name, password } = req.body;
  const hashedPassword = generate(password);
  let newUser = new User({
    email: email,
    name: name,
    password: hashedPassword,
  });
  newUser
    .save()
    .then((newUser: Document<any, any, UserType>) => res.json(newUser))
    .catch((error: Error) => {
      res.status(500).json({ error: error.message });
    });
};

const logIn = (req: Request, res: Response) => {
  let { email, password } = req.body;
  User.findOne({ email: email }).then((targetUser) => {
    if (targetUser && JWT_PRIVATE_KEY) {
      const targetUserData: LogInUserType = {
        email: targetUser.email,
        password: targetUser.password,
      };
      const userTokenData = {
        email: targetUser.email,
        id: targetUser._id.toString(),
      };
      const token = jwt.sign(userTokenData, JWT_PRIVATE_KEY);
      const match = verify(password, targetUserData.password);
      if (match) {
        res
          .cookie("token", token, { httpOnly: true })
          .json({ authorized: true, token });
      } else {
        res.json({ authorized: false, message: "Password mis-match" });
      }
    } else {
      res.json({ authorized: false, message: "Incorrect email" });
    }
  });
};

export { signUp, logIn };
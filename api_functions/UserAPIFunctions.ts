import { Request, Response } from "express";
import User from "../models/UserModel";
import { generate, verify } from "password-hash";
import { LogInUserType, UserType } from "../types/types";
import { Document } from "mongoose";

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
    if (targetUser) {
      const targetUserData: LogInUserType = {
        email: targetUser.email,
        password: targetUser.password,
      };
      const match = verify(password, targetUserData.password);
      if (match) {
        res.json({ authorized: true });
      } else {
        res.json({ authorized: false });
      }
    } else {
      res.json({ authorized: false });
    }
  });
};

export { signUp, logIn };

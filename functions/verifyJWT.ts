import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decodedUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY!);

  req.body.user = decodedUser;

  next();
};

export default verifyToken;

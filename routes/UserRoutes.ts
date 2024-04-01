import { signUp, logIn } from "../api_functions/UserRouteHandlers";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", signUp);

userRouter.post("/login", logIn);

export default userRouter;

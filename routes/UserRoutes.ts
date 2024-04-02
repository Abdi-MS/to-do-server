import { signUp, logIn } from "../routeHandlers/UserRouteHandlers";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", signUp);

userRouter.post("/login", logIn);

export default userRouter;

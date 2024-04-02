import { Router } from "express";
import {
  getAllToDos,
  getToDoByID,
  postToDo,
  updateToDo,
  deleteToDo,
} from "../routeHandlers/ToDoRouteHandlers";
import verifyToken from "../functions/verifyJWT";

const todoRouter = Router();

todoRouter.use(verifyToken)

todoRouter.get("/toDos", getAllToDos);

todoRouter.get("/toDos/:id", getToDoByID);

todoRouter.post("/toDos", postToDo);

todoRouter.put("/toDos/:id", updateToDo);

todoRouter.delete("/toDos/:id", deleteToDo);

export default todoRouter;

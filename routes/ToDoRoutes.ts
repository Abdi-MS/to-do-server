import { Router } from "express";
import {
  getAllToDos,
  getToDoByID,
  postToDo,
  updateToDo,
  deleteToDo,
} from "../routeHandlers/ToDoRouteHandlers";

const todoRouter = Router();

todoRouter.get("/toDos", getAllToDos);

todoRouter.get("/toDos/:id", getToDoByID);

todoRouter.post("/toDos", postToDo);

todoRouter.put("/toDos/:id", updateToDo);

todoRouter.delete("/toDos/:id", deleteToDo);

export default todoRouter;

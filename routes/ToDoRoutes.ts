import { Router } from "express";
import {
  getAllToDos,
  getToDoByID,
  postToDo,
  updateToDo,
  deleteToDo,
} from "../api_functions/ToDoAPIFunctions";

const todoRouter = Router();

todoRouter.get("/toDos", (req, res) => getAllToDos(req, res));

todoRouter.get("/toDos/:id", (req, res) => getToDoByID(req, res));

todoRouter.post("/toDos", (req, res) => postToDo(req, res));

todoRouter.put("/toDos/:id", (req, res) => updateToDo(req, res));

todoRouter.delete("/toDos/:id", (req, res) => deleteToDo(req, res));

export default todoRouter;

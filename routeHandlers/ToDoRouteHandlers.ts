import ToDo from "../models/ToDoModel";
import { EditedTodoType, ToDoType, userTokenDataType } from "../types/types";
import { Request, Response, Router } from "express";
import { Document } from "mongoose";

const getAllToDos = (req: Request, res: Response) => {
  const selectedUser = req.body.user.id;
  ToDo.find()
    .then((todos: Document<any, any, ToDoType>[] | null) => {
      const filteredToDos = todos?.filter((todo) => {
        return todo.get("user") === selectedUser;
      });
      res.json(filteredToDos);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: error.message });
    });
};

const getToDoByID = (req: Request, res: Response) => {
  const toDoId = req.params.id;
  ToDo.findOne({ id: toDoId })
    .then((user: Document<any, any, ToDoType> | null) => res.json(user))
    .catch((error: Error) => {
      res.status(500).json({ error: error.message });
    });
};

const postToDo = (req: Request, res: Response) => {
  const { id, text, checked, user }: ToDoType & { user: userTokenDataType } =
    req.body;
  const newToDo = new ToDo({ id, text, checked, user: user.id });
  newToDo
    .save()
    .then((savedToDo: Document<any, any, ToDoType> | null) => {
      res.json(savedToDo);
    })
    .catch((error: Error) => res.status(500).json({ error: error.message }));
};

const updateToDo = (req: Request, res: Response) => {
  let todoId: string = req.params.id;
  let { text, checked } = req.body;
  let selectedUser = req.body.user.id;
  let sentToDo = { text, checked };
  ToDo.findById(todoId)
    .then((todo) => {
      if (todo?.get("user") === selectedUser) {
        ToDo.findOneAndUpdate({ _id: todoId }, sentToDo, { new: true })
          .then((updatedToDo: Document<any, any, ToDoType> | null) => {
            res.json(updatedToDo);
          })
          .catch((error: Error) =>
            res.status(500).json({ error: error.message })
          );
      } else {
        res.status(500).json({ error: "Unauthorized operation blocked" });
      }
    })
    .catch((error: Error) => res.status(500).json({ error: error.message }));
};

const deleteToDo = (req: Request, res: Response) => {
  let todoId = req.params.id;
  const selectedUser = req.body.user.id;
  const todo = ToDo.findById(todoId);
  if (todo.get("user") === selectedUser) {
    ToDo.deleteOne({ id: todoId })
      .then((deletedToDo) => {
        if (deletedToDo.deletedCount === 1) {
          res.status(200).json({ message: "ToDo deleted successfully" });
        } else {
          res.status(404).json({ message: "ToDo not found" });
        }
      })
      .catch((error: Error) => res.status(500).json({ error: error.message }));
  } else {
    res.status(500).json({ error: "Unauthorized operation blocked" });
  }
};

export { getAllToDos, getToDoByID, postToDo, updateToDo, deleteToDo };

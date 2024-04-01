import ToDo from "../models/ToDoModel";
import { EditedTodoType, ToDoType } from "../types/types";
import { Request, Response, Router } from "express";
import { Document } from "mongoose";

const getAllToDos = (req: Request, res: Response) => {
  ToDo.find()
    .then((users: Document<any, any, ToDoType>[] | null) => res.json(users))
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
  const { id, text, checked }: ToDoType = req.body;
  const newToDo = new ToDo({ id, text, checked });
  newToDo
    .save()
    .then((savedToDo: Document<any, any, ToDoType> | null) => {
      res.json(savedToDo);
    })
    .catch((error: Error) => res.status(500).json({ error: error.message }));
};

const updateToDo = (req: Request, res: Response) => {
  let todoId: string = req.params.id;
  let updatedToDo: EditedTodoType = req.body;
  ToDo.findOneAndUpdate({ id: todoId }, updatedToDo, {
    new: true,
  })
    .then((updatedToDo: Document<any, any, ToDoType> | null) => {
      res.json(updatedToDo);
    })
    .catch((error: Error) => res.status(500).json({ error: error.message }));
};

const deleteToDo = (req: Request, res: Response) => {
  let todoId = req.params.id;
  ToDo.deleteOne({ id: todoId })
    .then((deletedToDo) => {
      if (deletedToDo.deletedCount === 1) {
        res.status(200).json({ message: "ToDo deleted successfully" });
      } else {
        res.status(404).json({ message: "ToDo not found" });
      }
    })
    .catch((error: Error) => res.status(500).json({ error: error.message }));
};

export { getAllToDos, getToDoByID, postToDo, updateToDo, deleteToDo };

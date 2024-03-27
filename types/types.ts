import mongoose from "mongoose";

export type ToDoType = {
  id: string;
  text: string;
  checked: boolean;
};

export type EditedTodoType = {
  id: string;
  text?: string;
  checked?: boolean;
};

export type mongoToDo = {
  _id: mongoose.Types.ObjectId;
  id: string;
  text: string;
  checked: boolean;
};

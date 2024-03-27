import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectDb";
import ToDo from "./models/ToDoModel";
import { EditedTodoType, ToDoType } from "./types/types";

dotenv.config();

const app = express();

const PORT = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/toDos", async (req, res) => {
  await ToDo.find()
    .then((users) => res.json(users))
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.get("/toDos/:id", (req, res) => {
  const toDoId = req.params.id;
  ToDo.findOne({ id: toDoId })
    .then((user) => res.json(user))
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.post("/toDos", (req, res) => {
  const { id, text, checked }: ToDoType = req.body;
  const newToDo = new ToDo({ id, text, checked });
  newToDo
    .save()
    .then((savedUser) => {
      res.json(savedUser);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.put("/toDos/:id", async (req, res) => {
  let todoId: string = req.params.id;
  let updatedToDo: EditedTodoType = req.body;
  try {
    const retrievedToDo = await ToDo.findOneAndUpdate(
      { id: todoId },
      updatedToDo,
      {
        new: true,
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/toDos/:id", (req, res) => {
  let todoId = req.params.id;
  ToDo.deleteOne({ id: todoId })
    .then((deletedToDo) => {
      if (deletedToDo) {
      } else {
        res.status(404).json({ message: "ToDo not found" });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectDb";
import todoRouter from "./routes/ToDoRoutes";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/', todoRouter)


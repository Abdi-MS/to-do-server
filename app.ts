import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectDb";
import todoRouter from "./routes/ToDoRoutes";
import userRouter from "./routes/UserRoutes";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use("/", todoRouter);
app.use("/auth", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectDb";
import todoRouter from "./routes/ToDoRoutes";
import userRouter from "./routes/UserRoutes";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/auth", userRouter);
app.use("/", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

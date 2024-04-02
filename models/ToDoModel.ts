import mongoose, { Schema, Document } from "mongoose";

interface IToDo extends Document {
  text: string;
  checked: boolean;
  user: string;
}

const ToDoSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const ToDo = mongoose.model<IToDo>("ToDo", ToDoSchema);

export default ToDo;

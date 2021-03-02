import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatDataSchema = new Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
});

const ChatData = mongoose.model("Chat", chatDataSchema);

export { ChatData as default };

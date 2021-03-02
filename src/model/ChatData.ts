import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatDataSchema = new Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  parentChat: { type: mongoose.Types.ObjectId, required: true, ref: "Chat" },
});

const ChatData = mongoose.model("ChatData", chatDataSchema);

export { ChatData as default };

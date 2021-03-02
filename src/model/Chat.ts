import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  user1: { type: String, required: true },
  user2: { type: String, required: true },
  chats: [
    {
      user: { type: String },
      text: { type: String },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

export { Chat as default };

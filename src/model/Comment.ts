import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { type: String, required: true },
  developer: { type: mongoose.Types.ObjectId, required: true, rep: "User" },
  postId: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
});

const Comment = mongoose.model("Comment", commentSchema);

export { Comment as default };

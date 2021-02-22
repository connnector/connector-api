import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { type: String, required: true },
  developer: { type: mongoose.Types.ObjectId, required: true, rep: "User" },
  repoId: { type: mongoose.Types.ObjectId, required: true, ref: "Repo" },
});

const Comment = mongoose.model("Comment", commentSchema);

export { Comment as default };

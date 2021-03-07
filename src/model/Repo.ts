import mongoose from "mongoose";

const Schema = mongoose.Schema;

const repoSchema = new Schema({
  title: { type: String, required: true },
  visibility: { type: String, required: true },
  desc: { type: String, required: true },
  developer: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  likes: { type: Number, required: true },
  comments: { type: Number, required: true },
});

const Repo = mongoose.model("Repo", repoSchema);

export { Repo as default };

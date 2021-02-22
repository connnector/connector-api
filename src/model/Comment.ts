import mongoose from "mongoose";

const Schema = mongoose.Schema;

const repoSchema = new Schema({
  text: { type: String, required: true },
  developer: { type: mongoose.Types.ObjectId, required: true, rep: "User" },
  repoId: { type: mongoose.Types.ObjectId, required: true, ref: "Repo" },
});

const Repo = mongoose.model("Repo", repoSchema);

export { Repo as default };

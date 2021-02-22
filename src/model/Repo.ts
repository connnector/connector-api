import mongoose from "mongoose";

const Schema = mongoose.Schema;

const repoSchema = new Schema({
  title: { type: String, required: true },
  visibility: { type: String, required: true },
  developer: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Repo", repoSchema);

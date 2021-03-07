import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  developer: { type: mongoose.Types.ObjectId, required: true, rep: "User" },
  repoId: { type: mongoose.Types.ObjectId, required: true, ref: "Repo" },
});

const Like = mongoose.model("Like", likeSchema);

export { Like as default };

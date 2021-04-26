import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  developer: { type: mongoose.Types.ObjectId, required: true, rep: "User" },
  post: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
});

const Like = mongoose.model("Like", likeSchema);

export { Like as default };

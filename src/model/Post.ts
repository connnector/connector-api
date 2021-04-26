import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    visibility: { type: String, required: true },
    desc: { type: String, required: true },
    developer: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    image: { type: String, required: true },
    likes: { type: Number, required: true },
    totalComments: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export { Post as default };

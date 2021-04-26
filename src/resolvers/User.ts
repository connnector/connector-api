import Post from "../model/Post";
import Comment from "../model/Comment";

const User = {
  posts: async (
    parent: { id: string; name: string; email: string },
    args,
    ctx,
    info
  ): Promise<object> => {
    if (args.visibility === "ALL") {
      try {
        const posts = await Post.find({ developer: args._id });
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    }
    try {
      const posts = await Post.find({
        developer: args._id,
        visibility: args.visibility.toLowerCase(),
      });
      return posts;
    } catch (e) {
      throw new Error(e);
    }
  },
  comments: async (
    parent,
    args: { idOfPost: string },
    ctx,
    info
  ): Promise<object> => {
    try {
      const postExists: any = await Post.findById(args.idOfPost);

      if (!postExists) {
        throw new Error("Post does not exist");
      }
      if (postExists.visibility === "private") {
        throw new Error("Post is Private");
      }
    } catch (e) {
      throw new Error(e);
    }
    try {
      const comments: any = await Comment.find({
        developer: parent.id,
        postId: args.idOfPost,
      });
      return comments;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export { User as default };

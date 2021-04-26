import User from "../model/User";
import post from "../model/Post";
import Comment from "../model/Comment";

const Post = {
  developer: async (parent, args, ctx, info): Promise<object> => {
    try {
      const developer = await User.findById(parent.developer);
      return developer;
    } catch (e) {
      throw new Error(e);
    }
  },
  comments: async (parent, args, ctx, info): Promise<object> => {
    try {
      const comments = await Comment.find({ postId: parent._id });
      return comments;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export { Post as default };

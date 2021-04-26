import User from "../model/User";
import Post from "../model/Post";
const Comment = {
  post: async (
    parent: { id: string; text: string; postId: string; developer: string },
    args,
    ctx,
    info
  ): Promise<object> => {
    try {
      return await Post.findById(parent.postId);
    } catch (e) {
      throw new Error(e);
    }
  },
  developer: async (
    parent: { id: string; text: string; postId: string; developer: string },
    args,
    ctx,
    info
  ): Promise<object> => {
    try {
      return await User.findById(parent.developer);
    } catch (e) {
      throw new Error(e);
    }
  },
};

export { Comment as default };

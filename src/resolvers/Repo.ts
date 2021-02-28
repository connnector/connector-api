import User from "../model/User";
import repo from "../model/Repo";
import Comment from "../model/Comment";

const Repo = {
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
      const comments = await Comment.find({ repoId: parent._id });
      return comments;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export { Repo as default };

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
  comments: (parent, args, { db }, info): {} => {
    return db.comments.filter((x) => x.repoId === parent.id);
  },
};

export { Repo as default };

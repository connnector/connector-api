import User from "../model/User";
import Repo from "../model/Repo";
const Comment = {
  repo: async (
    parent: { id: string; text: string; repoId: string; developer: string },
    args,
    ctx,
    info
  ): Promise<object> => {
    try {
      return await Repo.findById(parent.repoId);
    } catch (e) {
      throw new Error(e);
    }
  },
  developer: async (
    parent: { id: string; text: string; repoId: string; developer: string },
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

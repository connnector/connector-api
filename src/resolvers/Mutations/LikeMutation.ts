import Like from "../../model/Like";
import Repo from "../../model/Repo";
import { Context, getUserId, AuthError } from "../../utils";

export const like = async (
  parent,
  args: { data: { repoId: string } },
  ctx: Context,
  info
): Promise<number> => {
  let { id } = getUserId(ctx);
  if (id) {
    try {
      const repoValid: any = await Repo.find({
        id: args.data.repoId,
        visibility: "public",
      });
      if (!repoValid) {
        throw new Error("Repo is either private or doesnot exist");
      }

      const alreadyLiked = Like.findOne({
        repo: args.data.repoId,
        developer: id,
      });
      if (alreadyLiked) {
        (await alreadyLiked).delete;
        repoValid.likes = repoValid.likes + 1;
      } else {
        const newLike = new Like({
          repo: args.data.repoId,
          developer: id,
        });

        await newLike.save();
        repoValid.likes = repoValid.likes + 1;
      }
      return repoValid.likes;
    } catch (e) {
      throw new Error(e);
    }
  } else {
    throw new AuthError();
  }
};

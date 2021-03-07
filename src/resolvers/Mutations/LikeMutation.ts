import Like from "../../model/Like";
import Repo from "../../model/Repo";
import { Context, getUserId, AuthError } from "../../utils";

export const like = async (
  parent,
  args: { repoId: string },
  ctx: Context,
  info
): Promise<object> => {
  let { id } = getUserId(ctx);
  if (id) {
    try {
      const repoValid: any = await Repo.findOne({
        _id: args.repoId,
        visibility: "public",
      });
      if (!repoValid) {
        throw new Error("Repo is either private or doesnot exist");
      }

      const alreadyLiked = await Like.findOne({
        repo: args.repoId,
        developer: id,
      });
      console.log(alreadyLiked);
      if (alreadyLiked) {
        console.log("h");
        await alreadyLiked.delete();
        repoValid.likes = repoValid.likes - 1;
      } else {
        const newLike = new Like({
          repo: args.repoId,
          developer: id,
        });

        await newLike.save();
        repoValid.likes = repoValid.likes + 1;
      }
      return { number: repoValid.likes };
    } catch (e) {
      throw new Error(e);
    }
  } else {
    throw new AuthError();
  }
};

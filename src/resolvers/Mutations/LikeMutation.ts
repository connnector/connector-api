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
      const repoValid = await Repo.find({
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
      } else {
        const newLike = new Like({
          repo: args.data.repoId,
          developer: id,
        });

        await newLike.save();
      }
    } catch {}
    return 1;
  } else {
    throw new AuthError();
  }
};

import Like from "../../model/Like";
import Post from "../../model/Post";
import { Context, getUserId, AuthError } from "../../utils";

export const like = async (
  parent,
  args: { postId: string },
  ctx: Context,
  info
): Promise<object> => {
  let { id } = getUserId(ctx);
  if (id) {
    try {
      const postValid: any = await Post.findOne({
        _id: args.postId,
        visibility: "public",
      });
      if (!postValid) {
        throw new Error("Post is either private or doesnot exist");
      }

      const alreadyLiked = await Like.findOne({
        post: args.postId,
        developer: id,
      });
      if (alreadyLiked) {
        await alreadyLiked.delete();
        postValid.likes = postValid.likes - 1;
        await postValid.save();
      } else {
        const newLike = new Like({
          post: args.postId,
          developer: id,
        });

        await newLike.save();
        postValid.likes = postValid.likes + 1;
        await postValid.save();
      }
      return { number: postValid.likes };
    } catch (e) {
      throw new Error(e);
    }
  } else {
    throw new AuthError();
  }
};

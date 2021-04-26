import Post from "../../model/Post";
import { Context, getUserId, AuthError } from "../../utils";

export const createPost = async (
  parent,
  args: {
    postData: {
      title: string;
      visibility: string;
      desc: string;
      image: String;
    };
  },
  ctx: Context,
  info
): Promise<object> => {
  let { id } = getUserId(ctx);

  if (id) {
    let newPost: object;

    try {
      const titleTaken = await Post.findOne({
        title: args.postData.title,
        developer: id,
      });

      if (titleTaken) {
        throw new Error("title already taken");
      }
    } catch (e) {
      throw new Error(e);
    }

    try {
      newPost = Post.create({
        ...args.postData,
        developer: id,
        totalComments: 0,
        likes: 0,
      });
    } catch (e) {
      throw new Error(e);
    }

    return newPost;
  } else {
    throw new AuthError();
  }
};
export const deletePost = async (
  parent,
  args: { postId: string },
  ctx: Context,
  info
): Promise<object> => {
  let { id } = getUserId(ctx);
  if (id) {
    try {
      const existingPost: object = await Post.findByIdAndDelete(args.postId);
      if (!existingPost) {
        throw new Error("Post Not Found");
      }
      return existingPost;
    } catch (e) {
      throw new Error(e);
    }
  } else {
    throw new AuthError();
  }
};
export const updatePost = async (
  parent,
  args: {
    postId: string;
    updateData: { title: string; visibility: string; desc: string };
  },
  ctx: Context,
  info
): Promise<object> => {
  let { id } = getUserId(ctx);
  if (id) {
    try {
      let reqPost = await Post.findByIdAndUpdate(args.postId, {
        ...args.updateData,
      });
      if (!reqPost) {
        throw new Error("Post not found or invalid update fields");
      }
      return reqPost;
    } catch (e) {
      throw new Error(e);
    }
  } else {
    throw new AuthError();
  }
};

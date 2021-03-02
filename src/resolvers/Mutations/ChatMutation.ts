import Chat from "../../model/Chat";
import ChatData from "../../model/ChatData";
import { Context, getUserId, AuthError } from "../../utils";
import { startSession } from "mongoose";

export const StartChatting = async (
  parent,
  args: any,
  ctx: Context,
  info
): Promise<object> => {
  const { userName } = getUserId(ctx);

  if (!userName) {
    throw new AuthError();
  }
  let chat: any;
  try {
    const sess = await startSession();
    sess.startTransaction();
    chat =
      (await Chat.findOne({ user1: userName, user2: args.data.user2 })) ||
      (await Chat.findOne({ user1: args.data.user2, user2: userName }));
    if (!chat) {
      chat = new Chat({
        user1: userName,
        user2: args.data.user,
      });
      await chat.save({ session: sess });
    }
    const newChatData = new ChatData({
      user: userName,
      text: args.data.message,
      parentChat: chat._id,
    });

    await newChatData.save({ session: sess });
    await sess.commitTransaction();
  } catch (e) {
    throw new Error(e);
  }

  return chat;
};

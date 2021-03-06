import Chat from "../../model/Chat";
import User from "../../model/User";
import ChatData from "../../model/ChatData";
import { Context, getUserId, AuthError } from "../../utils";
import { startSession } from "mongoose";

export const startChatting = async (
  parent,
  args: any,
  ctx: Context,
  info
): Promise<object> => {
  const { userName } = getUserId(ctx);

  if (!userName) {
    throw new AuthError();
  }
  const recieverExist = await User.findOne({ userName: args.data.user2 });
  if (!recieverExist) {
    throw new Error("reciever doesnot exist");
  }
  let chat: any = null;
  let newChatData: any = null;
  try {
    const sess = await startSession();
    sess.startTransaction();
    chat = await Chat.findOne({
      $or: [
        { user1: userName, user2: args.data.user2 },
        { user1: args.data.user2, user2: userName },
      ],
    });
    if (!chat) {
      chat = new Chat({
        user1: userName,
        user2: args.data.user2,
      });
      await chat.save({ session: sess });
    }
    newChatData = new ChatData({
      user: userName,
      text: args.data.text,
      parentChat: chat.id,
    });

    await newChatData.save({ session: sess });
    await sess.commitTransaction();
  } catch (e) {
    throw new Error(e);
  }

  ctx.pubsub.publish(`chat ${newChatData.parentChat}`, {
    liveChat: newChatData,
  });

  return chat;
};

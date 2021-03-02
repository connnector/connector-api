import Chat from "../../model/Chat";
import { Context, AuthError, getUserId } from "../../utils";

const Subscription = {
  liveChat: {
    subscribe: async (parent, args: { chatId: string }, ctx: Context, info) => {
      //         const { userName } = getUserId(ctx);

      //   if (!userName) {
      //     throw new AuthError();
      //   }
      const chat = await Chat.findById(args.chatId);
      if (!chat) {
        throw new Error("Invalid chat id");
      }
      return ctx.pubsub.asyncIterator(`chat ${args.chatId}`);
    },
  },
};
export { Subscription as default };

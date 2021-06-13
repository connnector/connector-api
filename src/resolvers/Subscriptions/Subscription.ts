import Chat from "../../model/Chat";
import { authCheck } from "../../helper_functions/authCheck";

const Subscription = {
  liveChat: {
    subscribe: async (parent, args: { chatId: string }, context, info) => {
      authCheck(context);

      const chat = await Chat.findById(args.chatId);
      if (!chat) {
        throw new Error("Invalid chat id");
      }
      return context.pubsub.asyncIterator(`chat ${args.chatId}`);
    },
  },
};
export { Subscription as default };

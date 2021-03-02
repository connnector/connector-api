import ChatData from "../model/ChatData";

const Chat = {
  chats: async (parent, ars, ctx, info): Promise<object> => {
    let allChat: any;
    console.log(parent);
    try {
      allChat = await ChatData.find({ parentChat: parent.id });
      return allChat;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export { Chat as default };

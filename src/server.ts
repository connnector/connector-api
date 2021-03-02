import { GraphQLServer, PubSub } from "graphql-yoga";
import mongoose from "mongoose";
import Query from "./resolvers/Query";
import User from "./resolvers/User";
import Repo from "./resolvers/Repo";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscriptions/Subscription";
import Comment from "./resolvers/Comment";
import Chat from "./resolvers/Chat";
import Chalk from "chalk";

const PORT: string = process.env.PORT;

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    User,
    Repo,
    Mutation,
    Subscription,
    Comment,
    Chat,
  },
  context: (request) => ({
    ...request,
    pubsub,
  }),
});

mongoose
  .connect(
    "mongodb+srv://Johnny:iamjohnnyboy@cluster0.wepi9.mongodb.net/base?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    server.start({ port: PORT }, () => {
      console.log(Chalk.hex("#fab95b").bold(`The Server is Up ${PORT}`));
    });
  })
  .catch((e) => {
    console.log(e);
  });

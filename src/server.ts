import dotenv from "dotenv";
import { GraphQLServer, PubSub } from "graphql-yoga";
import mongoose from "mongoose";
import Query from "./resolvers/Query";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscriptions/Subscription";
import Comment from "./resolvers/Comment";
import Chat from "./resolvers/Chat";
import Chalk from "chalk";
import path from "path";

dotenv.config();

const PORT: string = process.env.PORT;

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    User,
    Post,
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

server.express.get("/uploads/*", (req, res, next) => {
  const pathDir = path.join(__dirname, `/uploads`);

  res.sendFile(pathDir);
  next();
});
mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    server.start(({ port: PORT }) => {
      console.log(Chalk.hex("#fab95b").bold(`The Server is Up ${PORT}`));
    });
  })
  .catch((e) => {
    console.log(e);
  });

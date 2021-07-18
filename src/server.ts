import dotenv from "dotenv";
import { ApolloServer, PubSub } from "apollo-server-express";
import { graphqlUploadExpress, GraphQLUpload } from "graphql-upload";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import http from "http";
import { importSchema } from "graphql-import";
import isAuth from "./middlewares/isAuth";
import databse from "./db";
import Query from "./resolvers/Query";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscriptions/Subscription";
import Comment from "./resolvers/Comment";
import Chat from "./resolvers/Chat";
import chalk from "chalk";
import path from "path";
//start
dotenv.config();

const typeDefs = importSchema("./src/schema.graphql");

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50000,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const resolvers = {
  Query,
  User,
  Post,
  Mutation,
  Subscription,
  Comment,
  Chat,
};

const PORT: string = process.env.PORT;
const pubsub = new PubSub();

const app = express();

app.use(apiLimiter);
app.use(xss());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);
app.use(mongoSanitize());
app.use(cors());
app.use(graphqlUploadExpress());

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.get("/", (req, res) =>
  res.json({ "Dev-Connector version": "v1", status: "healthy" })
);

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  uploads: false,
  resolvers: {
    ...resolvers,
    Upload: GraphQLUpload,
  },
  context: ({ req, res, connection }) => {
    return { ...isAuth(req), pubsub, res, req };
  },
  subscriptions: {
    path: "/subscriptions",
  },
});

const startServer = async () => {
  await startServer();
};

startServer()
  .then(() => {
    server.applyMiddleware({ app });
    server.installSubscriptionHandlers(httpServer);

    databse
      .connect()
      .then(() => {
        // Use native http server to allow subscriptions
        httpServer.listen(PORT || 4000, () => {
          console.log(
            chalk
              .hex("#fab95b")
              .bold(
                `🚀 Server ready at http://localhost:${
                  process.env.PORT || 4000
                }${server.graphqlPath}`
              )
          );
          console.log(
            chalk
              .hex("#fab95b")
              .bold(
                `🚀 Subscriptions ready at http://localhost:${
                  process.env.PORT || 4000
                }${server.subscriptionsPath}`
              )
          );
        });
      })
      .catch((e) => console.log(chalk.red(e)));
  })
  .catch((e) => {
    console.log(e);
  });

import { GraphQLServer } from "graphql-yoga";
import db from "./db";
import Query from "./resolvers/Query";
import User from "./resolvers/User";
import Repo from "./resolvers/Repo";
import Mutation from "./resolvers/Mutation";
import Chalk from "chalk";

const PORT: string = process.env.PORT;

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    User,
    Repo,
    Mutation,
  },
  context: {
    db,
  },
});

server.start({ port: PORT }, () => {
  console.log(Chalk.hex("#fab95b").bold(`The Server is Up ${PORT}`));
});

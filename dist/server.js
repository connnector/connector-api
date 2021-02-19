"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const db_1 = __importDefault(require("./db"));
const Query_1 = __importDefault(require("./resolvers/Query"));
const User_1 = __importDefault(require("./resolvers/User"));
const Repo_1 = __importDefault(require("./resolvers/Repo"));
const Mutation_1 = __importDefault(require("./resolvers/Mutation"));
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
        Query: Query_1.default,
        User: User_1.default,
        Repo: Repo_1.default,
        Mutation: Mutation_1.default,
    },
    context: {
        db: db_1.default,
    },
});
server.start(() => {
    console.log("The Server is Up");
});
//# sourceMappingURL=server.js.map
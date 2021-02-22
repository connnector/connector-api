"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./db"));
const Query_1 = __importDefault(require("./resolvers/Query"));
const User_1 = __importDefault(require("./resolvers/User"));
const Repo_1 = __importDefault(require("./resolvers/Repo"));
const Mutation_1 = __importDefault(require("./resolvers/Mutation"));
const Comment_1 = __importDefault(require("./resolvers/Comment"));
const chalk_1 = __importDefault(require("chalk"));
const PORT = process.env.PORT;
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
        Query: Query_1.default,
        User: User_1.default,
        Repo: Repo_1.default,
        Mutation: Mutation_1.default,
        Comment: Comment_1.default,
    },
    context: {
        db: db_1.default,
    },
});
mongoose_1.default
    .connect("mongodb+srv://Shubham:<password>@cluster0.wepi9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => {
    server.start({ port: PORT }, () => {
        console.log(chalk_1.default.hex("#fab95b").bold(`The Server is Up ${PORT}`));
    });
})
    .catch((e) => {
    console.log(e);
});
//# sourceMappingURL=server.js.map
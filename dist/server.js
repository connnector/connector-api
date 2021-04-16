"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const graphql_yoga_1 = require("graphql-yoga");
const mongoose_1 = __importDefault(require("mongoose"));
const Query_1 = __importDefault(require("./resolvers/Query"));
const User_1 = __importDefault(require("./resolvers/User"));
const Repo_1 = __importDefault(require("./resolvers/Repo"));
const Mutation_1 = __importDefault(require("./resolvers/Mutation"));
const Subscription_1 = __importDefault(require("./resolvers/Subscriptions/Subscription"));
const Comment_1 = __importDefault(require("./resolvers/Comment"));
const Chat_1 = __importDefault(require("./resolvers/Chat"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const pubsub = new graphql_yoga_1.PubSub();
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
        Query: Query_1.default,
        User: User_1.default,
        Repo: Repo_1.default,
        Mutation: Mutation_1.default,
        Subscription: Subscription_1.default,
        Comment: Comment_1.default,
        Chat: Chat_1.default,
    },
    context: (request) => (Object.assign(Object.assign({}, request), { pubsub })),
});
server.express.get("/uploads/*", (req, res, next) => {
    const pathDir = path_1.default.join(__dirname, `/uploads`);
    res.sendFile(pathDir);
    next();
});
console.log(process.env.URL);
mongoose_1.default
    .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => {
    server.start(({ port: PORT }) => {
        console.log(chalk_1.default.hex("#fab95b").bold(`The Server is Up ${PORT}`));
    });
})
    .catch((e) => {
    console.log(e);
});
//# sourceMappingURL=server.js.map
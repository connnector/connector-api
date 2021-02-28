"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const mongoose_1 = __importDefault(require("mongoose"));
const Query_1 = __importDefault(require("./resolvers/Query"));
const User_1 = __importDefault(require("./resolvers/User"));
const Repo_1 = __importDefault(require("./resolvers/Repo"));
const Mutation_1 = __importDefault(require("./resolvers/Mutation"));
const Comment_1 = __importDefault(require("./resolvers/Comment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const chalk_1 = __importDefault(require("chalk"));
const PORT = process.env.PORT;
let authenticated = null;
const autheticate = (resolve, root, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    try {
        token = jsonwebtoken_1.default.verify(context.request.get("Authorization"), "unexpectable bitch");
    }
    catch (e) {
        throw new Error("Not authorised");
    }
    const result = yield resolve(root, args, context, info);
    if (token) {
        authenticated = token.userId;
    }
    return result;
});
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
        Query: Query_1.default,
        User: User_1.default,
        Repo: Repo_1.default,
        Mutation: Mutation_1.default,
        Comment: Comment_1.default,
    },
    context: authenticated,
});
mongoose_1.default
    .connect("mongodb+srv://Johnny:iamjohnnyboy@cluster0.wepi9.mongodb.net/base?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
    server.start({ port: PORT }, () => {
        console.log(chalk_1.default.hex("#fab95b").bold(`The Server is Up ${PORT}`));
    });
})
    .catch((e) => {
    console.log(e);
});
//# sourceMappingURL=server.js.map
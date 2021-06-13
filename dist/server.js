"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_upload_1 = require("graphql-upload");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const http_1 = __importDefault(require("http"));
const graphql_import_1 = require("graphql-import");
const isAuth_1 = __importDefault(require("./middlewares/isAuth"));
const db_1 = __importDefault(require("./db"));
const Query_1 = __importDefault(require("./resolvers/Query"));
const User_1 = __importDefault(require("./resolvers/User"));
const Post_1 = __importDefault(require("./resolvers/Post"));
const Mutation_1 = __importDefault(require("./resolvers/Mutation"));
const Subscription_1 = __importDefault(require("./resolvers/Subscriptions/Subscription"));
const Comment_1 = __importDefault(require("./resolvers/Comment"));
const Chat_1 = __importDefault(require("./resolvers/Chat"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
//start
dotenv_1.default.config();
const typeDefs = graphql_import_1.importSchema("./src/schema.graphql");
const apiLimiter = express_rate_limit_1.default({
    windowMs: 60 * 60 * 1000,
    max: 50000,
    message: "Too many requests from this IP, please try again after 15 minutes",
});
const resolvers = {
    Query: Query_1.default,
    User: User_1.default,
    Post: Post_1.default,
    Mutation: Mutation_1.default,
    Subscription: Subscription_1.default,
    Comment: Comment_1.default,
    Chat: Chat_1.default,
};
const PORT = process.env.PORT;
const pubsub = new apollo_server_express_1.PubSub();
const app = express_1.default();
app.use(apiLimiter);
app.use(xss_clean_1.default());
app.use(helmet_1.default({
    contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
}));
app.use(express_mongo_sanitize_1.default());
app.use(cors_1.default());
app.use(graphql_upload_1.graphqlUploadExpress());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "./uploads")));
app.get("/", (req, res) => res.json({ "Dev-Connector version": "v1", status: "healthy" }));
const httpServer = http_1.default.createServer(app);
const server = new apollo_server_express_1.ApolloServer({
    typeDefs,
    uploads: false,
    resolvers: Object.assign(Object.assign({}, resolvers), { Upload: graphql_upload_1.GraphQLUpload }),
    context: ({ req, res, connection }) => {
        return Object.assign(Object.assign({}, isAuth_1.default(req)), { pubsub, res, req });
    },
    subscriptions: {
        path: "/subscriptions",
    },
});
server.applyMiddleware({ app });
server.installSubscriptionHandlers(httpServer);
db_1.default
    .connect()
    .then(() => {
    // Use native http server to allow subscriptions
    httpServer.listen(PORT || 4000, () => {
        console.log(chalk_1.default
            .hex("#fab95b")
            .bold(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`));
        console.log(chalk_1.default
            .hex("#fab95b")
            .bold(`🚀 Subscriptions ready at http://localhost:${process.env.PORT || 4000}${server.subscriptionsPath}`));
    });
})
    .catch((e) => console.log(chalk_1.default.red(e)));
//# sourceMappingURL=server.js.map
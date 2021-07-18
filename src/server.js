"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var apollo_server_express_1 = require("apollo-server-express");
var graphql_upload_1 = require("graphql-upload");
var express_1 = require("express");
var cors_1 = require("cors");
var express_rate_limit_1 = require("express-rate-limit");
var xss_clean_1 = require("xss-clean");
var helmet_1 = require("helmet");
var express_mongo_sanitize_1 = require("express-mongo-sanitize");
var http_1 = require("http");
var graphql_import_1 = require("graphql-import");
var isAuth_1 = require("./middlewares/isAuth");
var db_1 = require("./db");
var Query_1 = require("./resolvers/Query");
var User_1 = require("./resolvers/User");
var Post_1 = require("./resolvers/Post");
var Mutation_1 = require("./resolvers/Mutation");
var Subscription_1 = require("./resolvers/Subscriptions/Subscription");
var Comment_1 = require("./resolvers/Comment");
var Chat_1 = require("./resolvers/Chat");
var chalk_1 = require("chalk");
var path_1 = require("path");
//start
dotenv_1["default"].config();
var typeDefs = graphql_import_1.importSchema("./src/schema.graphql");
var apiLimiter = express_rate_limit_1["default"]({
    windowMs: 60 * 60 * 1000,
    max: 50000,
    message: "Too many requests from this IP, please try again after 15 minutes"
});
var resolvers = {
    Query: Query_1["default"],
    User: User_1["default"],
    Post: Post_1["default"],
    Mutation: Mutation_1["default"],
    Subscription: Subscription_1["default"],
    Comment: Comment_1["default"],
    Chat: Chat_1["default"]
};
var PORT = process.env.PORT;
var pubsub = new apollo_server_express_1.PubSub();
var app = express_1["default"]();
app.use(apiLimiter);
app.use(xss_clean_1["default"]());
app.use(helmet_1["default"]({
    contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false
}));
app.use(express_mongo_sanitize_1["default"]());
app.use(cors_1["default"]());
app.use(graphql_upload_1.graphqlUploadExpress());
app.use("/uploads", express_1["default"].static(path_1["default"].join(__dirname, "./uploads")));
app.get("/", function (req, res) {
    return res.json({ "Dev-Connector version": "v1", status: "healthy" });
});
var httpServer = http_1["default"].createServer(app);
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs,
    uploads: false,
    resolvers: __assign(__assign({}, resolvers), { Upload: graphql_upload_1.GraphQLUpload }),
    context: function (_a) {
        var req = _a.req, res = _a.res, connection = _a.connection;
        return __assign(__assign({}, isAuth_1["default"](req)), { pubsub: pubsub, res: res, req: req });
    },
    subscriptions: {
        path: "/subscriptions"
    }
});
server.applyMiddleware({ app: app });
server.installSubscriptionHandlers(httpServer);
db_1["default"]
    .connect()
    .then(function () {
    // Use native http server to allow subscriptions
    httpServer.listen(PORT || 4000, function () {
        console.log(chalk_1["default"]
            .hex("#fab95b")
            .bold("\uD83D\uDE80 Server ready at http://localhost:" + (process.env.PORT || 4000) + server.graphqlPath));
        console.log(chalk_1["default"]
            .hex("#fab95b")
            .bold("\uD83D\uDE80 Subscriptions ready at http://localhost:" + (process.env.PORT || 4000) + server.subscriptionsPath));
    });
})["catch"](function (e) { return console.log(chalk_1["default"].red(e)); });

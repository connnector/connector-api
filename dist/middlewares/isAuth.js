"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req) => {
    // This checks to see if there is an authorization field within the incoming request
    const authHeader = req.headers.authorization;
    let isAuth = false;
    // if there is no token
    if (!authHeader) {
        return {
            isAuth,
        };
    }
    // format of request sent will be Bearer tokenvalue
    // this splits it into two values bearer and the token
    const token = authHeader.split(" ")[1];
    // if the token is null or an empty string
    if (!token || token === "") {
        return {
            isAuth,
        };
    }
    // console.log(token);
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) {
            return {
                isAuth,
            };
        }
    }
    catch (e) {
        return {
            isAuth,
        };
    }
    // shows the user is an authenticated user
    // pulls data off the token
    const { id } = decodedToken;
    isAuth = true;
    return {
        isAuth,
        id,
    };
};
exports.default = isAuth;
//# sourceMappingURL=isAuth.js.map
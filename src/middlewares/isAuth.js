"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var isAuth = function (req) {
    // This checks to see if there is an authorization field within the incoming request
    var authHeader = req.headers.authorization;
    var isAuth = false;
    // if there is no token
    if (!authHeader) {
        return {
            isAuth: isAuth
        };
    }
    // format of request sent will be Bearer tokenvalue
    // this splits it into two values bearer and the token
    var token = authHeader.split(" ")[1];
    // if the token is null or an empty string
    if (!token || token === "") {
        return {
            isAuth: isAuth
        };
    }
    // console.log(token);
    var decodedToken;
    try {
        decodedToken = jsonwebtoken_1["default"].verify(token, process.env.SECRET);
        if (!decodedToken) {
            return {
                isAuth: isAuth
            };
        }
    }
    catch (e) {
        return {
            isAuth: isAuth
        };
    }
    // shows the user is an authenticated user
    // pulls data off the token
    var id = decodedToken.id, userName = decodedToken.userName;
    isAuth = true;
    console.log(isAuth, userName, id);
    return {
        isAuth: isAuth,
        id: id,
        userName: userName
    };
};
exports["default"] = isAuth;

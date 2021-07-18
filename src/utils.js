"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AuthError = exports.getUserId = void 0;
var jwt = require("jsonwebtoken");
var getUserId = function (ctx) {
    var Authorization = ctx.request.get("Authorization");
    if (Authorization) {
        var token = Authorization.replace("Bearer ", "");
        var _a = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET), id = _a.id, userName = _a.userName;
        return { id: id, userName: userName };
    }
    return null;
};
exports.getUserId = getUserId;
var AuthError = /** @class */ (function (_super) {
    __extends(AuthError, _super);
    function AuthError() {
        return _super.call(this, "Not authorized") || this;
    }
    return AuthError;
}(Error));
exports.AuthError = AuthError;

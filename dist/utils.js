"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = exports.getUserId = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const getUserId = (ctx) => {
    const Authorization = ctx.request.get("Authorization");
    if (Authorization) {
        const token = Authorization.replace("Bearer ", "");
        const { id, userName } = jwt.verify(token, process.env.SECRET);
        return { id, userName };
    }
    return null;
};
exports.getUserId = getUserId;
class AuthError extends Error {
    constructor() {
        super("Not authorized");
    }
}
exports.AuthError = AuthError;
//# sourceMappingURL=utils.js.map
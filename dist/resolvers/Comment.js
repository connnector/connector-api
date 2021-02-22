"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const Comment = {
    repo: (parent, args, { db }, info) => {
        return db.repos.find((x) => x.id === parent.repoId);
    },
    developer: (parent, args, { db }, info) => {
        const developerExists = db.users.findIndex((x) => x.id === parent.developer);
        if (developerExists === -1) {
            throw new Error("Developer doesnot exist");
        }
        return db.users[developerExists];
    },
};
exports.default = Comment;
//# sourceMappingURL=Comment.js.map
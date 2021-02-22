"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const User = {
    repos: (parent, args, { db }, info) => {
        if (args.visibility === "ALL") {
            return db.repos.filter((x) => x.developer === parent.id);
        }
        return db.repos.filter((x) => x.developer === parent.id &&
            x.visibility === args.visibility.toLowerCase());
    },
    comments: (parent, args, { db }, info) => {
        const repoExists = db.repos.findIndex((x) => x.id === args.idOfRepo);
        if (repoExists === -1) {
            throw new Error("Repo does not exist");
        }
        if (db.repos[repoExists].visibility === "private") {
            throw new Error("Repo is Private");
        }
        return db.comments.filter((x) => x.developer === parent.id && x.repoId === args.idOfRepo);
    },
};
exports.default = User;
//# sourceMappingURL=User.js.map
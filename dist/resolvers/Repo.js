"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const Repo = {
    developer: (parent, args, { db }, info) => {
        const developerExists = db.users.findIndex((x) => x.id === parent.developer);
        if (developerExists === -1) {
            throw new Error("Developer doesnot exist");
        }
        return db.users[developerExists];
    },
    comments: (parent, args, { db }, info) => {
        return db.comments.filter((x) => x.repoId === parent.id);
    },
};
exports.default = Repo;
//# sourceMappingURL=Repo.js.map
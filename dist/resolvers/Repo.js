"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const Repo = {
    developer: (parent, args, { db }, info) => {
        return db.users.find((x) => x.id === parent.developer);
    },
};
exports.default = Repo;
//# sourceMappingURL=Repo.js.map
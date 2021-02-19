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
};
exports.default = User;
//# sourceMappingURL=User.js.map
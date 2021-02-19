"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const uuid_1 = require("uuid");
const Mutation = {
    createUser: (parent, args, { db }, info) => {
        const email = db.users.find((x) => x.email === args.userData.email);
        if (email) {
            throw new Error("Emial Already Taken");
        }
        const newUser = Object.assign({ id: uuid_1.v4() }, args.userData);
        db.users.push(newUser);
        return newUser;
    },
};
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map
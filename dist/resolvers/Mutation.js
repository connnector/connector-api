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
    createRepo: (parent, args, { db }, info) => {
        const userExists = db.user.find((x) => x.id === args.repoData.developer);
        if (!userExists) {
            throw new Error("No developer with this id");
        }
        const newRepo = Object.assign({ id: uuid_1.v4() }, args.repoData);
        db.repos.push(newRepo);
        return newRepo;
    },
};
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map
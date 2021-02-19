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
    deleteUser: (parent, args, { db }, info) => {
        const existingUserIndex = db.users.findIndex((x) => x.id === args.userId);
        if (existingUserIndex === -1) {
            throw new Error("User Does Not exist");
        }
        const requiredUser = db.users[existingUserIndex];
        db.repos = db.repos.filter((x) => x.developer !== requiredUser.id);
        db.users = db.users.splice(existingUserIndex, 1);
        return requiredUser;
    },
    createRepo: (parent, args, { db }, info) => {
        const userExists = db.users.find((x) => x.id === args.repoData.developer);
        if (!userExists) {
            throw new Error("No developer with this id");
        }
        const newRepo = Object.assign({ id: uuid_1.v4() }, args.repoData);
        db.repos.push(newRepo);
        return newRepo;
    },
    deleteRepo: (parent, args, { db }, info) => {
        const existingRepoIndex = db.repos.findIndex((x) => x.id === args.repoId);
        if (existingRepoIndex === -1) {
            throw new Error("Repo Not Found");
        }
        const requiredRepo = db.repos[existingRepoIndex];
        db.repos = db.repos.splice(existingRepoIndex, 1);
        return requiredRepo;
    },
};
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const users = [
    {
        id: "shu",
        name: "shubham",
        email: "shubhambhardwajfdb@gmail.com",
    },
    {
        id: "shi",
        name: "shivam",
        email: "shivambhardwaj0129@gmail.com",
    },
    {
        id: "shre",
        name: "shreya",
        email: "bhardwajshreya1999@gmail.com",
    },
    {
        id: "shru",
        name: "shruti",
        email: "shrutibhardwaj0129@gmail.com",
    },
];
const repos = [
    {
        id: "weather",
        title: "weather app",
        visibility: "public",
        developer: "shi",
    },
    {
        id: "temperature",
        title: "temperature app",
        visibility: "private",
        developer: "shi",
    },
    {
        id: "flight",
        title: "flight system app",
        visibility: "public",
        developer: "shre",
    },
    { id: "chat", title: "chat app", visibility: "private", developer: "shre" },
    {
        id: "indecision",
        title: "indecesion app",
        visibility: "public",
        developer: "shru",
    },
    { id: "to-do", title: "to-do app", visibility: "private", developer: "shru" },
    {
        id: "faculty",
        title: "faculty app",
        visibility: "public",
        developer: "shu",
    },
    {
        id: "doubt-solver",
        title: "doubt-solver app",
        visibility: "private",
        developer: "shu",
    },
];
const comments = [
    {
        id: "cmnt1",
        text: "great",
        repoId: "faculty",
        developer: "shu",
    },
    {
        id: "cmnt2",
        text: "cool",
        repoId: "indecision",
        developer: "shu",
    },
    {
        id: "cmnt3",
        text: "gre",
        repoId: "doubt-solver",
        developer: "shi",
    },
    {
        id: "cmnt4",
        text: "great",
        repoId: "flight",
        developer: "shi",
    },
    {
        id: "cmnt5",
        text: "great",
        repoId: "temperature",
        developer: "shre",
    },
    {
        id: "cmnt6",
        text: "great",
        repoId: "to-do",
        developer: "shre",
    },
    {
        id: "cmnt7",
        text: "great",
        repoId: "chat",
        developer: "shru",
    },
    {
        id: "cmnt8",
        text: "great",
        repoId: "weather",
        developer: "shru",
    },
];
const db = {
    users,
    repos,
    comments,
};
exports.default = db;
//# sourceMappingURL=db.js.map
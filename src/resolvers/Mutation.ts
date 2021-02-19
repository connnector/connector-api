import { v4 as uuid4 } from "uuid";
const Mutation = {
  createUser: (
    parent,
    args: { userData: { name: string; email: string } },
    { db },
    info
  ): {} => {
    const email: {} = db.users.find((x) => x.email === args.userData.email);
    if (email) {
      throw new Error("Emial Already Taken");
    }
    const newUser: {} = {
      id: uuid4(),
      ...args.userData,
    };

    db.users.push(newUser);
    return newUser;
  },
  deleteUser: (parent, args: { userId: string }, { db }, info): {} => {
    const existingUserIndex: number = db.users.findIndex(
      (x) => x.id === args.userId
    );
    if (existingUserIndex === -1) {
      throw new Error("User Does Not exist");
    }
    const requiredUser: { id: string; name: string; email: string } =
      db.users[existingUserIndex];
    db.repos = db.repos.filter((x) => x.developer !== requiredUser.id);
    db.users = db.users.splice(existingUserIndex, 1);

    return requiredUser;
  },
  createRepo: (
    parent,
    args: {
      repoData: { title: String; visibility: String; developer: String };
    },
    { db },
    info
  ): {} => {
    const userExists = db.users.find((x) => x.id === args.repoData.developer);

    if (!userExists) {
      throw new Error("No developer with this id");
    }
    const newRepo = {
      id: uuid4(),
      ...args.repoData,
    };
    db.repos.push(newRepo);

    return newRepo;
  },
  deleteRepo: (parent, args: { repoId: string }, { db }, info): {} => {
    const existingRepoIndex: number = db.repos.findIndex(
      (x) => x.id === args.repoId
    );
    if (existingRepoIndex === -1) {
      throw new Error("Repo Not Found");
    }
    const requiredRepo: {
      id: string;
      title: string;
      developer: string;
      visibility: string;
    } = db.repos[existingRepoIndex];
    db.repos = db.repos.splice(existingRepoIndex, 1);

    return requiredRepo;
  },
};

export { Mutation as default };

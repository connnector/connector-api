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
};

export { Mutation as default };

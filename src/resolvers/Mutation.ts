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
};

export { Mutation as default };

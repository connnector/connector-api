const Query = {
  users: (parent, args: { nameQuery: string }, { db }, info): [{}] => {
    if (!args.nameQuery) {
      return db.users;
    } else if (args.nameQuery) {
      return db.users.filter((x) => {
        let k: number = 0;
        for (let i: number = 0; i < x.name.length; i++) {
          for (let j: number = 0; j < args.nameQuery.length; j++) {
            if (x.name[i + j] !== args.nameQuery[j]) {
              k = 0;
              break;
            }
            k++;
            if (k === args.nameQuery.length) {
              return x;
            }
          }
        }
      });
    }
  },
  userById: (parent, args: { idQuery: string }, { db }, info): {} => {
    const reqUser: {} = db.users.find((x) => x.id === args.idQuery);
    return reqUser;
  },
  repos: (parent, args: { nameQuery: string }, { db }, info): [{}] => {
    if (!args.nameQuery) {
      return db.repos.filter((x) => x.visibility === "public");
    } else if (args.nameQuery) {
      return db.repos.filter((x) => {
        let k: number = 0;
        for (let i: number = 0; i < x.title.length; i++) {
          for (let j: number = 0; j < args.nameQuery.length; j++) {
            if (x.title[i + j] !== args.nameQuery[j]) {
              k = 0;
              break;
            }
            k++;
            if (k === args.nameQuery.length) {
              if (x.visibility !== "private") {
                return x;
              }
            }
          }
        }
      });
    }
  },
  repoById: (parent, args, { db }, info): {} => {
    const reqRepo: {} = db.repos.find((x) => x.id === args.idQuery);
    return reqRepo;
  },
};

export { Query as default };

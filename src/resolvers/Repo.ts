const Repo = {
  developer: (parent, args, { db }, info): {} => {
    return db.users.find((x) => x.id === parent.developer);
  },
};

export { Repo as default };

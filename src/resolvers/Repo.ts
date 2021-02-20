const Repo = {
  developer: (parent, args, { db }, info): [object] => {
    const developerExists: number = db.users.findIndex(
      (x) => x.id === parent.developer
    );
    if (developerExists === -1) {
      throw new Error("Developer doesnot exist");
    }
    return db.users[developerExists];
  },
  comments: (parent, args, { db }, info): {} => {
    return db.comments.filter((x) => x.repoId === parent.id);
  },
};

export { Repo as default };

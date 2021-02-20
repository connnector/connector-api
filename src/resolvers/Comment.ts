const Comment = {
  repo: (parent, args, { db }, info): object => {
    return db.repos.find((x) => x.id === parent.repoId);
  },
  developer: (
    parent: { id: string; text: string; repoId: string; developer: string },
    args,
    { db },
    info
  ): object => {
    const developerExists: number = db.users.findIndex(
      (x) => x.id === parent.developer
    );
    if (developerExists === -1) {
      throw new Error("Developer doesnot exist");
    }
    return db.users[developerExists];
  },
};

export { Comment as default };

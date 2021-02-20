const User = {
  repos: (
    parent: { id: string; name: string; email: string },
    args,
    { db },
    info
  ): [{}] => {
    if (args.visibility === "ALL") {
      return db.repos.filter((x) => x.developer === parent.id);
    }
    return db.repos.filter(
      (x) =>
        x.developer === parent.id &&
        x.visibility === args.visibility.toLowerCase()
    );
  },
  comments: (
    parent,
    args: { idOfRepo: string },
    { db },
    info
  ): [{ object }] => {
    const repoExists = db.repos.findIndex((x) => x.id === args.idOfRepo);

    if (repoExists === -1) {
      throw new Error("Repo does not exist");
    }
    if (db.repos[repoExists].visibility === "private") {
      throw new Error("Repo is Private");
    }
    return db.comments.filter(
      (x) => x.developer === parent.id && x.repoId === args.idOfRepo
    );
  },
};

export { User as default };

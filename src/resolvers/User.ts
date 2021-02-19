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
};

export { User as default };

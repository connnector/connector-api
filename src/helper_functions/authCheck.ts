export const authCheck = async (context) => {
  if (!context.isAuth) {
    throw new Error("User Not Authenticated");
  }
};

import * as jwt from "jsonwebtoken";

export interface Context {
  request: any;
}

const getUserId = (ctx: Context) => {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.SECRET) as {
      userId: string;
    };
    return userId;
  }

  throw new AuthError();
};

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

export { getUserId as default };

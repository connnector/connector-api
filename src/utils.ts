import * as jwt from "jsonwebtoken";

export interface Context {
  request: any;
}

export const getUserId = (ctx: Context) => {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.SECRET) as {
      userId: string;
    };
    console.log(userId);
    return userId;
  }

  return null;
};

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

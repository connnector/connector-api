import * as jwt from "jsonwebtoken";

export interface Context {
  request: any;
  pubsub;
}

export const getUserId = (ctx: Context) => {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { id, userName } = jwt.verify(token, process.env.SECRET) as {
      id: string;
      userName: string;
    };

    return { id, userName };
  }

  return null;
};

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

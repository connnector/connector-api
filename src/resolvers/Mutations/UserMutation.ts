import bcrypt from "bcryptjs";
import User from "../../model/User";
import jwt from "jsonwebtoken";
import { Context, getUserId, AuthError } from "../../utils";

export const signUp = async (
  parent,
  args: { userData: { name: string; email: string; password: string } },
  ctx,
  info
): Promise<object> => {
  let existingUser;
  try {
    existingUser = await User.findOne({ email: args.userData.email });
  } catch (e) {
    throw new Error(e);
  }

  if (existingUser) {
    throw new Error("user already exists");
  }
  let hashedPassword: string;
  try {
    hashedPassword = await bcrypt.hash(args.userData.password, 12);
  } catch (e) {
    throw new Error();
  }
  let newUser: object;

  const token = jwt.sign(
    { name: args.userData.name, email: args.userData.email },
    process.env.SECRET
  );
  try {
    newUser = await User.create({
      ...args.userData,
      password: hashedPassword,
    });
  } catch (e) {
    throw new Error(e);
  }
  const returnData: object = {
    user: newUser,
    token,
    expirationTime: 1,
  };
  return returnData;
};
export const deleteUser = async (
  parent,
  args,
  ctx: Context,
  info
): Promise<object> => {
  let id = getUserId(ctx);
  if (id) {
    try {
      const existingUser: object = await User.findByIdAndDelete(id);
      if (!existingUser) {
        throw new Error("User Does Not exist");
      }
      return existingUser;
    } catch (e) {
      throw new Error(e);
    }
  } else {
    throw new AuthError();
  }
};
export const updateUser = async (
  parent,
  args: { updateData: { name: string; email: string } },
  ctx: Context,
  info
): Promise<object> => {
  let id = getUserId(ctx);
  if (id) {
    try {
      if (args.updateData.email) {
        const emailTaken = await User.findOne({
          email: args.updateData.email,
        });
        if (emailTaken) {
          throw new Error("Email Already taken");
        }
      }
      const reqUser: object = await User.findByIdAndUpdate(id, {
        ...args.updateData,
      });
      if (!reqUser) {
        throw new Error("User not found");
      }
      return reqUser;
    } catch (e) {
      throw new Error(e);
    }
  } else {
    throw new AuthError();
  }
};

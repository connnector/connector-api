import bcrypt from "bcryptjs";
import User from "../../model/User";
import { uploadImage } from "../../helper_functions/UploadImage";
import jwt from "jsonwebtoken";
import { Context, getUserId, AuthError } from "../../utils";

export const signUp = async (
  parent,
  args: {
    userData: {
      userName: string;
      name: string;
      email: string;
      password: string;
    };
    file: any;
  },
  ctx,
  info
): Promise<object> => {
  // let existingUser;
  // try {
  //   existingUser =
  //     (await User.findOne({ email: args.userData.email })) ||
  //     (await User.findOne({ userName: args.userData.userName }));
  // } catch (e) {
  //   throw new Error(e);
  // }

  // if (existingUser) {
  //   throw new Error("Username or email already in use");
  // }

  if (args.file) {
    let hashedFile: Promise<void> = uploadImage(args.file);
  }

  let hashedPassword: string;
  try {
    hashedPassword = await bcrypt.hash(args.userData.password, 12);
  } catch (e) {
    throw new Error();
  }
  let newUser: any;

  try {
    newUser = await User.create({
      ...args.userData,
      password: hashedPassword,
    });
  } catch (e) {
    throw new Error(e);
  }
  const token = jwt.sign(
    { id: newUser._id, userName: newUser.userName },
    process.env.SECRET
  );
  const returnData: object = {
    user: newUser,
    token,
    expirationTime: 1,
  };
  return returnData;
};

export const login = async (
  parent,
  args: { email: string; password: string },
  ctx: Context,
  info
): Promise<object> => {
  try {
    const existingUser: any = await User.findOne({ email: args.email });
    if (!existingUser) {
      throw new Error("User doesNot exist");
    }
    const match = await bcrypt.compare(args.password, existingUser.password);
    if (!match) {
      throw new Error("Incorrect password");
    }
    const token = jwt.sign(
      { id: existingUser._id, userName: existingUser.userName },
      process.env.SECRET
    );

    const returnData: object = {
      user: existingUser,
      token,
      expirationTime: 1,
    };
    return returnData;
  } catch (e) {
    throw new Error(e);
  }
};
export const deleteUser = async (
  parent,
  args,
  ctx: Context,
  info
): Promise<object> => {
  let { id } = getUserId(ctx);
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
  let { id } = getUserId(ctx);
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

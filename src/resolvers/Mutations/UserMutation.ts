import bcrypt from "bcryptjs";
import User from "../../model/User";
import Otp from "../../model/Otp";
import { uploadImage } from "../../helper_functions/UploadImage";
import jwt from "jsonwebtoken";
import { Context, getUserId, AuthError } from "../../utils";
import { sendConfirmationEmail } from "../../helper_functions/sendMail";
// import { confirmOtp } from "../../helper_functions/confirmOtp";

const confirmOtp = async (databaseId, otp) => {
  let otp_object: any;
  //finding otp with given fields

  try {
    otp_object = await Otp.findOne({ _id: databaseId });
  } catch (e) {
    throw new Error(e);
  }

  if (!otp_object) {
    throw new Error("Incorrect Otp");
  }

  if (otp_object.text !== otp) {
    throw new Error("Incorrect Otp");
  }
  return otp_object;
};

export const sendOtp = async (
  parent,
  args: {
    data: {
      email: string;
      password: string;
    };
  },
  ctx,
  info
): Promise<object> => {
  // let existingUser;
  const email: string = args.data.email.toLowerCase();

  // try {
  //   existingUser = await User.findOne({ email: args.data.email });
  // } catch (e) {
  //   throw new Error(e);
  // }

  // if (existingUser) {
  //   throw new Error("Username or email already in use");
  // }

  const otp = await sendConfirmationEmail(email);

  const otp_already_sent_previously: any = await Otp.findOne({ email });

  if (otp_already_sent_previously) {
    if (args.data.password) {
      try {
        otp_already_sent_previously.password = await bcrypt.hash(
          args.data.password,
          12
        );
      } catch (e) {
        throw new Error();
      }
    }

    try {
      otp_already_sent_previously.text = otp;
    } catch (e) {
      throw new Error(e);
    }
    await otp_already_sent_previously.save();

    return { databaseId: otp_already_sent_previously._id };
  }

  let hashedPassword: string;

  try {
    hashedPassword = await bcrypt.hash(args.data.password, 12);
  } catch (e) {
    throw new Error();
  }

  let otp_object: any;

  try {
    otp_object = new Otp({
      text: otp,
      email: args.data.email,
      password: hashedPassword,
    });
  } catch (e) {
    throw new Error(e);
  }

  await otp_object.save();

  return { databaseId: otp_object._id };
};

export const signUp = async (
  parent,
  args: {
    userData: {
      userName: string;
      name: string;
    };
    databaseId: String;
    otp: string;
    file: any;
  },
  ctx,
  info
): Promise<object> => {
  let newUser: any;

  const otp_object: any = await confirmOtp(args.databaseId, args.otp);

  try {
    newUser = await User.create({
      ...args.userData,
      email: otp_object.email,
      password: otp_object.password,
    });
  } catch (e) {
    throw new Error(e);
  }
  const token = jwt.sign(
    { id: newUser._id, userName: newUser.userName },
    process.env.SECRET
  );

  try {
    await Otp.deleteOne({
      _id: otp_object.id,
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

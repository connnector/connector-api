const Otp = require("../model/Otp");

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

export { confirmOtp };

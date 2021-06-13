import sgMail from "@sendgrid/mail";
import otp from "otp-generator";

const gridKey = process.env.GRID_KEY;

sgMail.setApiKey(gridKey);

const sendConfirmationEmail = async (email) => {
  let required_otp: string;
  //generating otp

  try {
    required_otp = otp.generate(6, {
      alphabets: false,
      digits: true,
      upperCase: false,
      specialChars: false,
    });

    await sgMail.send({
      to: email,
      from: process.env.MAIL_ID,
      subject: "Welcome To Dev-connector",
      html: `<h2>Your otp is <strong> ${required_otp} </strong></h2>`,
    });

    return required_otp;
  } catch (e) {
    throw new Error(e);
  }
};

export { sendConfirmationEmail };

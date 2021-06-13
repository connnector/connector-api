const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const otpSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const Otp = mongoose.model("Otp", otpSchema);

export { Otp as default };

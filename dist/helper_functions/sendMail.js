"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmationEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const gridKey = process.env.GRID_KEY;
mail_1.default.setApiKey(gridKey);
const sendConfirmationEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let required_otp;
    //generating otp
    try {
        required_otp = otp_generator_1.default.generate(6, {
            alphabets: false,
            digits: true,
            upperCase: false,
            specialChars: false,
        });
        yield mail_1.default.send({
            to: email,
            from: process.env.MAIL_ID,
            subject: "Welcome To Dev-connector",
            html: `<h2>Your otp is <strong> ${required_otp} </strong></h2>`,
        });
        return required_otp;
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.sendConfirmationEmail = sendConfirmationEmail;
//# sourceMappingURL=sendMail.js.map
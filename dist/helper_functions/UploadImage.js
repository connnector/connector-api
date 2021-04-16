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
exports.uploadImage = void 0;
const shortid_1 = __importDefault(require("shortid"));
const ExensionCheck_1 = require("./ExensionCheck");
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const id = shortid_1.default.generate();
    const { createReadStream, filename } = yield file;
    yield ExensionCheck_1.extensionCheck(filename);
});
exports.uploadImage = uploadImage;
//# sourceMappingURL=UploadImage.js.map
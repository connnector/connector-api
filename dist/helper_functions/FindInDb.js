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
exports.findInDb = void 0;
const image_hash_1 = require("image-hash");
const ImageHash_1 = __importDefault(require("../model/ImageHash"));
const findInDb = (f_name) => __awaiter(void 0, void 0, void 0, function* () {
    let fileName = f_name;
    try {
        yield image_hash_1.imageHash(`../../${fileName}`, 16, true, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            const hash = data;
            console.log(hash);
            const imageAlreadyInDb = yield ImageHash_1.default.findOne({
                hashValue: hash,
            });
            if (imageAlreadyInDb) {
                console.log("needs to be deleted");
                return imageAlreadyInDb;
            }
            const new_hash = new ImageHash_1.default({
                hashValue: hash,
            });
            yield new_hash.save();
            return new_hash;
        }));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.findInDb = findInDb;
//# sourceMappingURL=FindInDb.js.map
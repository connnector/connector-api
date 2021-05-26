"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const imageHashSchema = new Schema({
    hashValue: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
    },
});
const ImageHash = mongoose.model("ImageHash", imageHashSchema);
exports.default = ImageHash;
//# sourceMappingURL=ImageHash.js.map
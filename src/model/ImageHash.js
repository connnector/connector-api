"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var imageHashSchema = new Schema({
    hashValue: {
        type: String,
        required: true
    },
    fileName: {
        type: String
    }
});
var ImageHash = mongoose.model("ImageHash", imageHashSchema);
exports["default"] = ImageHash;

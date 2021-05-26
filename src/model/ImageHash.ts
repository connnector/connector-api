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

export { ImageHash as default };

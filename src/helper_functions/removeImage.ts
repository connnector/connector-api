const { unlink } = require("fs");

export const removeImage = async (image_path) => {
  unlink(image_path, (err) => {
    if (err) throw err;

    console.log("file deleted");
  });
};

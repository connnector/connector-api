export const extensionCheck = async (filename) => {
  let extension = filename.split(".")[1];

  if (extension === "jpg" || extension === "jpeg" || extension === "png") {
    return true;
  }
  throw new Error("Image Extention Error");
};

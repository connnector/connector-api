import { imageHash } from "image-hash";
import ImageHash from "../model/ImageHash";
import { removeImage } from "./removeImage";

export const findInDb = (save_path: string) => {
  let fileName;
  try {
    imageHash(save_path, 16, true, async (error, data) => {
      const hash = data;

      const imageAlreadyInDb = await ImageHash.findOne({
        hashValue: hash,
      });

      if (imageAlreadyInDb) {
        console.log("needs to be deleted");

        removeImage(save_path);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

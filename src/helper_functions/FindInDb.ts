import { imageHash } from "image-hash";
import ImageHash from "../model/ImageHash";
import { removeImage } from "./removeImage";

export const findInDb = async (f_name: string) => {
  let fileName = f_name;
  try {
    await imageHash(`../../${fileName}`, 16, true, async (error, data) => {
      const hash = data;
      console.log(hash);
      const imageAlreadyInDb = await ImageHash.findOne({
        hashValue: hash,
      });

      if (imageAlreadyInDb) {
        console.log("needs to be deleted");

        return imageAlreadyInDb;
      }

      const new_hash = new ImageHash({
        hashValue: hash,
      });
      await new_hash.save();

      return new_hash;
    });
  } catch (error) {
    throw new Error(error);
  }
};

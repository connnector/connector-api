import shortid from "shortid";
import { extensionCheck } from "./ExensionCheck";
const { createWriteStream, unlinkSync } = require("fs");
const path = require("path");

export const uploadImage = async (file) => {
  const id = shortid.generate();
  const { createReadStream, filename } = await file;

  await extensionCheck(filename);
  const save_path = path.join(__dirname, "../../uploads", `/${id}-${filename}`);

  await new Promise((resolve, reject) =>
    createReadStream()
      .on("error", (error) => {
        if (createReadStream().truncated)
          // delete the truncated file
          unlinkSync(path);
        reject(error);
      })
      .pipe(createWriteStream(save_path))
      .on("error", (error) => reject(error))
      .on("finish", () => resolve({ path }))
  );
};

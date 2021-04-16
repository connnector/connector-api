import shortid from 'shortid'
import {extensionCheck} from "./ExensionCheck"

export const uploadImage = async(file) => {

    const id = shortid.generate()
    const { createReadStream , filename } = await file;

    await extensionCheck(filename)

}
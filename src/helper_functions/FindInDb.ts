import {imageHash} from "image-hash"
import ImageHash from "../model/ImageHash"


const findInDb =  (save_path : string) => {

    let fileName;

    return new Promise((resolve) => {
        imageHash(save_path,16,true,async(error,data) => {
            const hash = data;

            const imageAlreadyInDb = await ImageHash.findOne({
                hashValue:hash
            }) 

            if(imageAlreadyInDb){
                console.log("needs to be deleted")
            }

            
        })
    })

}
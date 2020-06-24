import { resolve } from "path"
import { randomBytes } from "crypto"
import { diskStorage } from "multer";

const tmpFolder = resolve(__dirname, "..", "..", "tmp")

export default {
    directory: tmpFolder,  
    storage: diskStorage({
        destination: resolve(__dirname, "..", "..", "tmp"),
        filename(req, file, callback) {
            const fileHash = randomBytes(10).toString("hex")
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}
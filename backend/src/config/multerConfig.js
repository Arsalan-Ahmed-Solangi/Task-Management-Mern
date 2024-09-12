const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const [folder, fieldName] = file.fieldname.split("/");
        const uploadPath = path.join("uploads", folder);
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
        
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({ storage })
module.exports = upload

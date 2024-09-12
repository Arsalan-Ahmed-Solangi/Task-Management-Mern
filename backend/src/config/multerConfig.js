const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const uploadPath = "uploads";

        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                return cb(new Error('Failed to create directory'), null);
            }
            cb(null, uploadPath);
        });

    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },

})
module.exports = upload

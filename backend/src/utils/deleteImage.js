const deleteImage = (filePath) => {

    try {

        const fullPath = path.join(__dirname, 'uploads', filePath);


        fs.unlink(fullPath, (err) => {
            if (err) {
                return { error: err.message, message: "Error in Deleting File" }

            } else {
                console.error(`Error deleting the file: ${filePath}`);

            }
        });

    } catch (err) {
        return { error: err.message }
    }

};

module.exports = deleteImage;
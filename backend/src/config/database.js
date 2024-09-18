const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database Connected ${mongoose.connection.host}`)

    } catch (error) {
        console.log(`Database Connection Error : ${error.message}`);
    }
}

module.exports = connectDB;
const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({

    ClientName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Phone: {
        type: String,
        required:true,
        isUnique: true,
    },
    Status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
    Country: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },

    Profile: {
        type: String,
        required: true,
    },
    Website: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


module.exports = mongoose.model("Client", clientSchema);
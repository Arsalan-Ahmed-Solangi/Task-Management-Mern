const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    RoleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    },
    Name: {
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
        isUnique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Designation: {
        type: String,
    },
    Status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
    Profile: {
        type: String,
    },
    Website: {
        type: String,
    },
    Address: {
        type: String
    },
    otp: String,
    otpExpiresAt: Date,
}, {
    timestamps: true
});


module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({

    RoleName: {
        type: String,
        required: true
    },
    RolePermission: {
        type: String,
        required: true,
    },
    RolePermissionCount: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("Role", roleSchema);
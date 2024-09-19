const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({

    UserIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    ProjectName: {
        type: String,
        required: true
    },
    Description: {
        type: String,
    },

    Status: {
        type: String,
        default: "Not Started",
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("Project", projectSchema);
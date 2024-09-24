const { number } = require("joi");
const mongoose = require("mongoose");

const listSchema = mongoose.Schema({


    ProjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    ListName: {
        type: String,
        unique: true,
        required: true

    },
    Order:{
        type:number,
        required:true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("List", listSchema);
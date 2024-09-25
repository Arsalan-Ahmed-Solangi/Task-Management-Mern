const { number } = require("joi");
const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({


    ProjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    ListId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
        required: true,
    },
    UserIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    TaskName:{
        type:String,
        required:true,
    },
    TaskDescription:{
        type:String,
        required:true,
    },
    Status:{
        type:Number,
        required:true,
    },
    Date:{
        type: Date,
        required: true,
    },

  
}, {
    timestamps: true
});


module.exports = mongoose.model("Task", taskSchema);
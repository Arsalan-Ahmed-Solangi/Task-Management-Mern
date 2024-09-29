//****ImportingPackages*****//
const joi = require("joi");
const { validateRequest } = require("../utils/validation");
const Project = require("../models/Project");
const List = require("../models/List");
const Task = require("../models/Task");



//*****getTasks*******//
exports.getTasks = async (req,res)=>{

    //****Validations*****//
    const schema = {
        ProjectId: joi.string().required()

    }
    const { error } = validateRequest(req.body, schema);
    if (error) {
        return res.status(401).json({
            success: false,
            message: "Validation Failed",
            error: error.details
        });
    }

    try {

        const { ProjectId } = req.body;
    
        const getData = await Task.find({ ProjectId }).populate({
            path: "UserIds", select: "Name Designation Status"
        }).populate({
            path: "ListId",
            select: "ListName"
        }).populate({
            path: "ProjectId",
            select: "ProjectName budget startDate endDate"
        }).exec();
        if (!getData) {
            return res.status(400).json({
                success: false,
                error: "No Project Tasks Found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Project Tasks fetched successfully!",
            data: getData
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}


//*****AddTasks*******//
exports.addTask = async (req,res)=>{

    //****Validations*****//
    const schema = {
        ProjectId: joi.string().required(),
        ListId:joi.string().required(),
        TaskName:joi.string().required(),
        TaskDescription : joi.string().required(),
        Status : joi.string().required(),
        Date : joi.string().required(),
   
    }
    const { error } = validateRequest(req.body, schema);
    if (error) {
        return res.status(401).json({
            success: false,
            message: "Validation Failed",
            error: error.details
        });
    }

    try {
        
        const { TaskName,TaskDescription,Status,Date,ListId,ProjectId } = req.body;


        const checkExits = await Task.findOne({TaskName:TaskName,ProjectId:ProjectId})
        if(checkExits){
            return res.status(400).json({
                success:false,  
                message:`${TaskName} already exists`
            })
        }


        const saveData = new Task({
            TaskName, TaskDescription, ProjectId,ListId, Status, Date
        })
        await saveData.save();

        if (!saveData) {
            return res.status(200).json({
                success: false,
                error: `${TaskName} failed to create!`,
            })

        }
        return res.status(200).json({
            success: true,
            message: `${TaskName} Task created successfully!`,
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}

//*****UpdateTask*******//
exports.updateTask = async (req,res)=>{

    //****Validations*****//
    const schema = {
        TaskId: joi.string().required(),
        
        ListId:joi.string().required(),
        TaskName:joi.string().required(),
        TaskDescription : joi.string().required(),
        Status : joi.string().required(),
        Date : joi.string().required(),
   
    }
    const { error } = validateRequest(req.body, schema);
    if (error) {
        return res.status(401).json({
            success: false,
            message: "Validation Failed",
            error: error.details
        });
    }

    try {
        
        const { TaskName,TaskDescription,Status,Date,ListId,TaskId } = req.body;


        const checkExists = await Task.findById(TaskId)
        if(!checkExists){
            return res.status(400).json({
                success:false,  
                message:`No Task Found!`
            })
        }

        checkExists.TaskName = TaskName
        checkExists.TaskDescription = TaskDescription
        checkExists.Status = Status
        checkExists.Date = Date
        checkExists.ListId = ListId

        const saveData = await checkExists.save();


        if (!saveData) {
            return res.status(200).json({
                success: false,
                error: `${TaskName} failed to create!`,
            })

        }
        return res.status(200).json({
            success: true,
            message: `${TaskName} Task created successfully!`,
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}


//****MoveTaskList*****//
exports.moveTaskList = async (req,res)=>{

    //****Validations*****//
    const schema = {
        TaskId: joi.string().required(),
        ListId:joi.string().required(),
        
   
    }
    const { error } = validateRequest(req.body, schema);
    if (error) {
        return res.status(401).json({
            success: false,
            message: "Validation Failed",
            error: error.details
        });
    }

    try {
        
        const { TaskId,ListId } = req.body;


        const checkExists = await Task.findById(TaskId)
        if(!checkExists){
            return res.status(400).json({
                success:false,  
                message:`No Task Found!`            })
        }

        checkExists.ListId = ListId;

        const saveData = await checkExists.save();

        if (!saveData) {
            return res.status(200).json({
                success: false,
                error: `${checkExists.TaskName} failed to update!`,
            })

        }
        return res.status(200).json({
            success: true,
            message: `${checkExists.TaskName} List  Updated successfully!`,
        })


        


    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

//****ImportingPackages*****//
const joi = require("joi");
const { validateRequest } = require("../utils/validation");
const Project = require("../models/Project");
const List = require("../models/List");


//****GetProjectList*******//
exports.getProjectList = async (req, res) => {

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

        const getProjectList = await List.find({ ProjectId });
        if (!getProjectList) {
            return res.status(400).json({
                success: false,
                error: "No Project Lists Found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Project list fetched successfully!",
            data: getProjectList
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}


//*****AddProjectList*******//
exports.addProjectList = async (req,res)=>{

    //****Validations*****//
     const schema = {
        ProjectId: joi.string().required(),
        ListName : joi.string().min(3).required(),
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


        const { ProjectId,ListName,Order  } = req.body;

        const checkData = await List.findOne({ListName:ListName,ProjectId:ProjectId});
        if(checkData){
            return res.status(400).json({
                success:false,  
                message:`${ListName} already exists`
            })
        }

        const saveData = new List({
            ListName,ProjectId
        })
        await saveData.save();
        if (!saveData) {
            return res.status(200).json({
                success: false,
                error: `${ListName} failed to create!`,
            })

        }
        return res.status(200).json({
            success: true,
            message: `${ListName}  created successfully!`,
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
}
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

        const getProjectList = await List.findOne({ ProjectId });
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
    return res.send("working Fin Here")
}
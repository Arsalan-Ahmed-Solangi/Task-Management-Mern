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

        const getData = await Task.find({ ProjectId });
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
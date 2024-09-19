//****ImportingPackages*****//
const joi = require("joi");
const { validateRequest } = require("../utils/validation");
const Project = require("../models/Project");


//***Start of getProjects*****//
exports.getProjects = async (req, res) => {

    try {

        const getData = await Project.find().populate({
            path: "UserIds", select: "Name Designation Status"
        }).populate({
            path: "ClientId",
            select: "ClientName Website Profile Email Phone"
        }).exec();
        if (!getData) {
            return res.status(400).json({
                success: false,
                error: "No Projects Found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Projects fetched successfully!",
            data: getData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
}
//***End of getProjects*****//

//***Start of getSingleProject****//
exports.getSingleProjectDetails = async (req, res) => {
    try {


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
        const { ProjectId } = req.body;
        const getData = await Project.findById(ProjectId).populate({
            path: "UserIds", select: "Name Designation Status"
        }).populate({
            path: "ClientId",
            select: "ClientName Website Profile Email Phone"
        }).exec();
        if (!getData) {
            return res.status(400).json({
                success: false,
                error: "No Projects Found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Project Details fetched successfully!",
            data: getData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
}
//***End of getSingleProject*******//

//***Start of createProject*****//
exports.create = async (req, res) => {


    //****Validations*****//
    const schema = {

        ProjectName: joi.string().min(3).required()
            .messages({
                "string.empty": "Project name is required!",
                "string.min": "Project name must be at least 3 characters",
                'any.required': "Project name is required!"
            }),

        Status: joi.string().required().messages({
            'any.required': "Status is required",
            'string.empty': "Status is required!",
        }),
        ClientId: joi.string().required(),
        Description: joi.string().required(),
        budget: joi.number().required(),
        startDate: joi.date().required(),
        endDate: joi.date().required(),
        UserIds: joi.array().items(
            joi.string().required().messages({
                "any.required": "User ID is required",
                "string.empty": "User ID cannot be empty"
            })
        ).min(1).required().messages({
            "array.min": "At least one User ID is required",
            "any.required": "UserIds are required"
        })

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

        const { ProjectName, ClientId, Status, Description, budget, startDate, endDate, UserIds } = req.body;
        const checkExists = await Project.findOne({ ProjectName });
        if (checkExists) {
            return res.status(400).json({
                success: false,
                error: `${ProjectName} Project is already exists!`,
            })
        }

        const saveData = new Project({
            ProjectName, Status, ClientId, Description, startDate, endDate, budget, UserIds
        })
        await saveData.save();

        if (!saveData) {
            return res.status(200).json({
                success: false,
                error: `${ProjectName} failed to create!`,
            })

        }
        return res.status(200).json({
            success: true,
            message: `${ProjectName} Project created successfully!`,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
}
//***End of createProject*****//
//****ImportingPackages*****//
const joi = require("joi");
const { validateRequest } = require("../utils/validation");
const Project = require("../models/Project");
const User = require("../models/User");
const mongoose = require("mongoose");

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


//*****Start of UpdateProjectDetails*********//
exports.update = async (req, res) => {

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
        ProjectId: joi.string().required(),
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

        const { ProjectName, ProjectId, ClientId, Status, Description, budget, startDate, endDate, UserIds } = req.body;


        //******CheckIfProjectIdMatches*******//
        const checkExists = await Project.findById(ProjectId);
        if (!checkExists) {
            return res.status(400).json({
                success: false,
                error: `Project Not Found!`,
            })
        }

        if (ProjectName && ProjectName != checkExists.ProjectName) {
            const checkNameUnique = await Project.findOne({ ProjectName });
            if (checkNameUnique) {
                return res.status(400).json({
                    success: false,
                    error: `${ProjectName} with this name already exists!`,
                });
            }
        }


        if (UserIds) {
            const existingUserIds = checkExists.UserIds.map(id => id.toString());
            const newUserIds = UserIds.filter(id => !existingUserIds.includes(id));

            if (newUserIds.length > 0) {

                checkExists.UserIds = [...existingUserIds, ...newUserIds];
            }
        }


        checkExists.ProjectName = ProjectName || checkExists.ProjectName;
        checkExists.Status = Status || checkExists.Status;
        checkExists.Description = Description || checkExists.Description;
        checkExists.startDate = startDate || checkExists.startDate;
        checkExists.endDate = endDate || checkExists.endDate;
        checkExists.budget = budget || checkExists.budget;
        checkExists.ClientId = ClientId || checkExists.ClientId;



        const saveData = await checkExists.save();

        if (!saveData) {
            return res.status(200).json({
                success: false,
                error: `${ProjectName} failed to update!`,
            })

        }
        return res.status(200).json({
            success: true,
            message: `${ProjectName} Project Updated successfully!`,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}
//****End of UpdateProjectDetails********//


//****Start of AddProjectStaff*******//
exports.addProjectStaff = async (req, res) => {

    //****Validations*****//
    const schema = {

        ProjectId: joi.string().required(),
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

        const { ProjectId, UserIds } = req.body;

        const projectDetails = await Project.findById(ProjectId);
        if (!projectDetails) {

            return res.status(400).json({
                success: false,
                error: "No Project Found!"
            })
        }

        if (UserIds) {
            const existingUserIds = projectDetails.UserIds.map(id => id.toString()); // Convert ObjectIds to string for comparison
            const newUserIds = [];
        
            UserIds.forEach(userId => {
                if (!existingUserIds.includes(userId)) {
                    newUserIds.push(userId);
                }
            });

            projectDetails.UserIds = [...existingUserIds, ...newUserIds];
        }


        const saveData = await projectDetails.save();
        if (!saveData) {
            return res.status(400).json({
                success: false,
                error: "Failed to update"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Project Staff Added Successfully!"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}
//***End of AddProjectStaff*******//

//****Start of removeProjectStaff*******//
exports.removeProjectStaff = async (req, res) => {

    //****Validations*****//
    const schema = {

        ProjectId: joi.string().required(),
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

        const { ProjectId, UserIds } = req.body;

        const projectDetails = await Project.findById(ProjectId);
        if (!projectDetails) {

            return res.status(400).json({
                success: false,
                error: "No Project Found!"
            })
        }

        if (UserIds) {
            const existingUserIds = projectDetails.UserIds.map(id => id.toString()); // Convert ObjectIds to string for comparison
            
            const updatedUserIds = existingUserIds.filter(id => !UserIds.includes(id)); // Remove matching UserIds
        
            projectDetails.UserIds = updatedUserIds;
        }


        const saveData = await projectDetails.save();
        if (!saveData) {
            return res.status(400).json({
                success: false,
                error: "Failed to update"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Project Staff Removed Successfully!"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}
//***End of removeProjectStaff*******//
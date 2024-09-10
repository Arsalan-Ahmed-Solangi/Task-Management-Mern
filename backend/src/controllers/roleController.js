//*****ImportingPackages******//
const joi = require("joi");
const { validateRequest } = require("../utils/validation");
const bcrypt = require('bcrypt');
const User = require("../models/User");
const Role = require("../models/Role");


//***CreateRole*****//
exports.createRole = async (req, res) => {


    //****Validations*****//
    const schema = {
        RoleName: joi.string().min(3).required()
            .messages({
                "string.empty": "Role Name is required!",
                "string.min": "Role Name must be at least 3 characters",
            }),
        RolePermissionCount: joi.number().required()
            .messages({
                "number.empty": "Role Permission Count is required!"
            }),
        RolePermission: joi.string().min(3).required()
            .messages({
                "string.empty": "Role Name is required!",
                "string.min": "Role Name must be at least 3 characters",
            }),


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
        const { RoleName, RolePermission, RolePermissionCount } = req.body;


        const checkRole = await Role.findOne({ RoleName });
        if (checkRole) {
            return res.status(400).json({
                success: false,
                error: `${RoleName} Role is already exists!`,
            })
        }

        const newRole = new Role({
            RoleName, RolePermission, RolePermissionCount
        })
        await newRole.save();

        if (!newRole) {
            return res.status(200).json({
                success: false,
                error: `${RoleName} failed to create!`,
            })

        }

        return res.status(200).json({
            success: true,
            message: `${RoleName} Role created successfully!`,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}

//****UpdateRole*****//
exports.updateRole = async (req, res) => {


    //****Validations*****//
    const schema = {
        RoleId:  joi.string().required()
        .messages({
            "string.empty": "Role Id is required!",
        }),
        RoleName: joi.string().min(3).required()
            .messages({
                "string.empty": "Role Name is required!",
                "string.min": "Role Name must be at least 3 characters",
            }),
        RolePermissionCount: joi.number().required()
            .messages({
                "number.empty": "Role Permission Count is required!"
            }),
        RolePermission: joi.string().min(3).required()
            .messages({
                "string.empty": "Role Name is required!",
                "string.min": "Role Name must be at least 3 characters",
            }),


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
        const { RoleName, RolePermission, RolePermissionCount,RoleId } = req.body;


        const checkRole = await Role.findById(RoleId);
        if (!checkRole) {
            return res.status(400).json({
                success: false,
                error: `${RoleName} Role not found!`,
            })
        }

        checkRole.RoleName = RoleName
        checkRole.RolePermission = RolePermission
        checkRole.RolePermissionCount = RolePermissionCount
        const updateRole = await checkRole.save();

        if (!updateRole) {
            return res.status(200).json({
                success: false,
                error: `${RoleName} failed to update!`,
            })

        }

        return res.status(200).json({
            success: true,
            message: `${RoleName} updated successfully!`,
            data:updateRole
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}

//***GetRoles******//
exports.getRoles = async (req, res) => {


    try {



        const getRoles = await Role.find();
        if (!getRoles) {
            return res.status(400).json({
                success: false,

                error: "No Roles Found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Roles fetched successfully!",
            data: getRoles
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}

//***getRoleDetails******//
exports.getRoleDetails = async (req, res) => {

    //****Validations*****//
    const schema = {
        RoleId: joi.string().required()
            .messages({
                "string.empty": "Role Id is required!",
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

        const { RoleId } = req.body;

        const getDetails = await Role.findOne({ _id:RoleId });
        if (!getDetails) {
            return res.status(400).json({
                success: false,

                error: "No Roles Found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Roles fetched successfully!",
            data: getDetails
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}
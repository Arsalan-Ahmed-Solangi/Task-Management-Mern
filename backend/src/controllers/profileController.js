//****ImportingPackages*****//
const joi = require("joi");
const { validateRequest } = require("../utils/validation");
const Project = require("../models/Project");


//***Start of getProjects*****//
exports.getProjects = async (req, res) => {

    try {

        const getData = await Project.find();
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
        budget: joi.number().required(),
        startDate : joi.date().required(),
        endDate : joi.date().required(),

        

    }
    const { error } = validateRequest(req.body, schema);
    if (error) {
        return res.status(401).json({
            success: false,
            message: "Validation Failed",
            error: error.details
        });
    }
    return res.send("Wor")
    try {


        const { ClientName, Email, Phone, Status, Country, City, Address, Website } = req.body
        const checkExists = await Client.findOne({ Email });
        if (checkExists) {
            return res.status(400).json({
                success: false,
                error: `${ClientName} Client is already exists!`,
            })
        }

        let profileImagePath = null;
        if (req.file) {
            profileImagePath = req.file.path;
        }


        const saveData = new Client({
            ClientName, Profile: profileImagePath, Email, Phone, Status, Address, Website, Country, City, Address
        })
        await saveData.save();

        if (!saveData) {
            return res.status(200).json({
                success: false,
                error: `${ClientName} failed to create!`,
            })

        }
        return res.status(200).json({
            success: true,
            message: `${ClientName} Client created successfully!`,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}
//***End of createProject*****//
//****ImportingPackages*****//
const joi = require("joi");
const { validateRequest } = require("../utils/validation");
const Client = require("../models/Client");



//***Start of GetClients*****//
exports.getClients = async (req, res) => {

    try {
        const getClients = await Client.find();
        if (!getClients) {
            return res.status(400).json({
                success: false,

                error: "No Clients Found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Clients fetched successfully!",
            data: getClients
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
}
//***End of GetClients*****//

//***Start of CreateClient*****//
exports.create = async (req, res) => {


    //****Validations*****//
    const schema = {
        ClientName: joi.string().min(3).required()
            .messages({
                "string.empty": "Client name is required!",
                "string.min": "Client name must be at least 3 characters",
                'any.required': "Client name is required!"
            }),
        Email: joi.string().email().required()
            .messages({
                "string.email": "Email must be a valid email address",
                "string.empty": "Email is required!",
                "any.required": "Email is required!",

            }),
        Status: joi.string().required().messages({
            'any.required': "Status is required",
            'string.empty': "Status is required!",
        }),
        Phone: joi.number().min(11).required(),
        Country: joi.string().required().messages({
            'any.required': "Country is required!",
        }),
        City: joi.string().required().messages({
            'any.required': "City is required!",
        }),
        Website: joi.string().uri({ scheme: ['http', 'https'] }).messages({
            "string.empty": "Website url is required!"
        }),
        Address: joi.string().required()

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


        const { ClientName, Email, Phone, Status, Country, City, Address, Website } = req.body
        const checkExists = await Client.findOne({ Email });
        if (checkExists) {
            return res.status(400).json({
                success: false,
                error: `${ClientName} Client is already exists!`,
            })
        }
        return res.send("Work");
        const saveData = new Client({
            ClientName, Email, Phone, Status, Address, Website, Country, City, Address
        })
        await saveData.save();

        if (!saveData) {
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
//***End of CreateClient*****//
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

//***Start of getClientDetails*****//
exports.getClientDetails = async (req, res) => {


    const schema = {
        ClientId: joi.string().required().messages({
            'any.required': "Client name is required!"
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

        const { ClientId } = req.body;
        const getData = await Client.findById(ClientId);
        if (!getData) {
            return res.status(400).json({
                success: false,

                error: "No Client Found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Client Details fetched successfully!",
            data: getData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
}
//***End of getClientDetails*****//

//****Start of DeleteClient*****//
exports.deleteClients = async (req, res) => {
    const schema = {
        ClientId: joi.string().required().messages({
            'any.required': "Client name is required!"
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

        const { ClientId } = req.body;
        const result = await Client.deleteOne({ _id: ClientId });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No Client Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Client deleted successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
}
//****End of DeleteClient*****//

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
//***End of CreateClient*****//

//***Start of updateClient*****//
exports.updateClient = async (req, res) => {


    //****Validations*****//
    const schema = {
        ClientId: joi.string().required().messages({
            'any.required': "ClientId is required!"
        }),
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
        Phone: joi.string().optional(),
        Status: joi.string().optional(),
        Address: joi.string().optional(),
        Website: joi.string().optional(),
        Country: joi.string().optional(),
        City: joi.string().optional()

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


        const { ClientName, ClientId, Email, Phone, Status, Country, City, Address, Website } = req.body;
  
        const client = await Client.findById(ClientId);
        if (!client) {
            return res.status(404).json({
                success: false,
                error: `Client not found!`,
            });
        }
    
        if (Email && Email !== client.Email) {
            const checkExists = await Client.findOne({ Email });
            if (checkExists) {
                return res.status(400).json({
                    success: false,
                    error: `${ClientName} Client with this email already exists!`,
                });
            }
        }

        client.ClientName = ClientName || client.ClientName;
        client.Email = Email || client.Email;
        client.Phone = Phone || client.Phone;
        client.Status = Status || client.Status;
        client.Country = Country || client.Country;
        client.City = City || client.City;
        client.Address = Address || client.Address;
        client.Website = Website || client.Website;

        const checkExists = await Client.findOne({ Email, _id: { $ne: ClientId } });
        if (checkExists) {
            return res.status(400).json({
                success: false,
                error: `Email already assigned to another one!`,
            })
        }

        if (req.file) {
            client.Profile = req.file.path;
        }
        const updatedClient = await client.save();

        if (!updatedClient) {
            return res.status(400).json({
                success: false,
                error: `${ClientName} failed to update!`,
            });
        }

        return res.status(200).json({
            success: true,
            message: `${ClientName} Client updated successfully!`,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
        
            error: error.message
        });
    }

}
//***End of updateClient*****//
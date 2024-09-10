//*****ImportingPackages******//
const joi = require("joi");
const { validateRequest } = require("../utils/validation");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const bcrypt = require('bcrypt');
const User = require("../models/User");
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator');
const sendMail = require("../config/sendMail");



//***Start of AuthLogin******//
exports.authLogin = async (req, res) => {

    //****Validations*****//
    const schema = {
        Email: joi.string().email().required()
            .messages({
                "string.email": "Email must be a valid email address",
                "string.empty": "Email is required!",
                "any.required": "Email is required!",

            }),

        Password: joi.string().required().min(6)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'))
            .messages({
                "string.empty": "Password is required!",
                "string.min": "Password must be at least 6 characters long!",
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!',

                "any.required": "Password is required!"
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

        const { Email, Password } = req.body;
        const checkUser = await User.findOne({ Email }).populate({
            path: "RoleId",
            select: "RoleName RolePermissions RolePermissionCount"
        });
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                error: "Account Not Found!"
            })
        }

        const checkPassword = await bcrypt.compare(Password, checkUser.Password);
        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                error: "Wrong Credentials!"
            })
        }

        const token = jwt.sign({ checkUser }, process.env.JWT_TOKEN, { expiresIn: '1h' })

        return res.status(200).json({
            success: true,
            message: "Login Successfull!",
            token: token
        });



    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}
//***End of AuthLogin*******//


//***Start of SignUp******//
exports.signup = async (req, res) => {


    //****Validations*****//
    const schema = {
        Email: joi.string().email().required()
            .messages({
                "string.email": "Email must be a valid email address",
                "string.empty": "Email is required!",
                "any.required": "Email is required!",

            }),
        Name: joi.string().required().messages({
            "string.empty": "Name is required"
        }),
        RoleId: joi.string().required().messages({
            "string.empty": "RoleId is required!"
        }),

        Password: joi.string().required().min(6)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'))
            .messages({
                "string.empty": "Password is required!",
                "string.min": "Password must be at least 6 characters long!",
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!',

                "any.required": "Password is required!"
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
        const { Email, Password, RoleId, Name } = req.body;

        const checkUser = await User.findOne({ Email });
        if (checkUser) {
            return res.status(400).json({
                success: false,
                error: "User is already exist!"
            })
        }

        const hashPassword = await bcrypt.hash(Password, 10);

        const newUser = new User({
            Name,
            Email,
            Password: hashPassword,
            RoleId,
            Profile: "",
            Phone: "",
            Designation: "",
            Website: "",
            Address: ""
        })
        await newUser.save();


        return res.status(200).json({
            success: true,
            message: "User Signup Successfully!",
            data: { Email: Email }
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }



}
//***End of SignUp*******//


//*****Start of SendOTP*******//
exports.sendOTP = async (req, res) => {

    //****Validations*****//
    const schema = {
        Email: joi.string().email().required()
            .messages({
                "string.email": "Email must be a valid email address",
                "string.empty": "Email is required!",
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

        const { Email } = req.body;

        const checkUser = await User.findOne({ Email });
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                error: "No account associated with this email"
            })
        }

        const otp = otpGenerator.generate(6, { number: true, upperCaseAlphabets: true, lowerCaseAlphabets: false, specialChars: false });
        const expireTime = 10;
        const otpExpiresAt = Date.now() + expireTime * 60 * 1000; //***Expire10Minutes***//


        //***SaveOtpForUser*****//
        checkUser.otp = otp;
        checkUser.otpExpiresAt = otpExpiresAt;
        await checkUser.save();

        //****EmailConfig*****//
        const body = `Your One-Time Password (OTP) is ${otp}. Please use this code to complete your action. The OTP is valid for ${expireTime} minutes`;
        const subject = `Your OTP Code: ${otp}`;

        await sendMail(Email, subject, body)



        return res.status(200).json({
            success: true,
            message: "OTP sent successfully!",
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}
//****End of SendOTP*****//


//***Start of VerifyOTP*****//
exports.verifyOTP = async (req, res) => {


    //***ValidateSchema*****//
    const schema = {
        Email: joi.string().email().required().messages({
            "string.email": "Email must be a valid email address",
            "string.empty": "Email is required!",
        }),
        OTP: joi.string().required().messages({
            "string.empty": "OTP is required!",
        }),
    };

    const { error } = validateRequest(req.body, schema);
    if (error) {
        return res.status(401).json({
            success: false,
            message: "Validation Failed",
            error: error.details,
        });
    }

    try {

        const { Email, OTP } = req.body;

        const checkUser = await User.findOne({ Email });
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "No account associated with this email!"
            })
        }

        if (checkUser.otp !== OTP) {
            return res.status(400).json({
                success: false,
                error: "Invalid OTP!",
            });
        }
        console.log(Date.now(), checkUser.otpExpiresAt)
        if (Date.now() > checkUser.otpExpiresAt) {
            return res.status(400).json({
                success: false,
                error: "OTP has expired!",
            });

        }

        //****GenerateToken*****//
        const token = jwt.sign({ UserId: checkUser._id }, process.env.JWT_TOKEN, { expiresIn: '10m' })


        return res.status(200).json({
            success: true,
            message: "OTP verified successfully!",
            token: token
        });

    } catch (error) {
        return res.status(400).json({
            success: false,

            error: error.message,
        });
    }

}
//***End of VerifyOTP********//

//*****Start of ResetPassword*********//
exports.resetPassword = async (req, res) => {

    //***ValidateSchema*****//
    const schema = {
        Password: joi.string().required().min(6)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'))
            .messages({
                "string.empty": "New password is required!",
                "string.min": "Password must be at least 6 characters long!",
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!',
                "any.required": "New password is required!"
            })
    };

    const { error } = validateRequest(req.body, schema);
    if (error) {
        return res.status(401).json({
            success: false,
            message: "Validation Failed",
            error: error.details,
        });
    }


    try {

        const { Password } = req.body;
        const { UserId } = req.data;

        const checkUser = await User.findById(UserId);
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "No account associated with this email!"
            })
        }

        //***HashedPassword*****//
        const hashedPassword = await bcrypt.hash(Password, 10);
        checkUser.Password = hashedPassword;
        await checkUser.save();

        return res.status(200).json({
            success: true,
            message: "Password Update Successfully!"
        })



    } catch (error) {
        return res.status(400).json({
            success: false,

            error: error.message,
        });
    }
}
//****End of ResetPassword******//
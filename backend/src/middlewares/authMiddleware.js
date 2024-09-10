//******ImportingPackages******//
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.authToken = async (req,res,next) => {

    const token = req.headers['authorization'] && req.headers['authorization'].split(" ")[1];

    if (!token) {

        return res.status(401).json({
            success: false,
            error: "Authorization Token Not Found!"
        });
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err, data) => {

        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token has expired. Please log in again.'
                });
            }
            return res.status(403).json({
                success: false,
                message: "Token & Secret Key Not Matched!"
            });
        }

        req.data = data;
        next();
    });

}
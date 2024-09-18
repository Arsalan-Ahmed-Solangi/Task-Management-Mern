//*****ImportingPackages*****//
const express = require("express");
const { authLogin, signup, sendOTP, verifyOTP, resetPassword } = require("../controllers/authController");
const { authToken } = require("../middlewares/auth.middleware");
const router = express.Router();


//****AuthLogin*****//
router.post("/login", authLogin);

//***SignUp****//
router.post("/signup", signup);

//***SendOTP*****//
router.post("/send-otp", sendOTP);

//***VerifyOTP****//
router.post("/verify-otp", verifyOTP);

//****ResetPassword*****//
router.post("/reset-password",authToken, resetPassword);

module.exports = router;    
//****ImportingPackages*****//
const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { getProjects, create } = require("../controllers/profileController");


//***getProjects*****//
router.post("/getProjects", getProjects);


//****Create*****//
router.post("/create",create);



module.exports = router;
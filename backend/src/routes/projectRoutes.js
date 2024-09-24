//****ImportingPackages*****//
const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { getProjects, create, getSingleProjectDetails, update, addProjectStaff, removeProjectStaff } = require("../controllers/profileController");


//***getProjects*****//
router.post("/getProjects", getProjects);


//****Create*****//
router.post("/create",create);

//****Update*****//
router.post("/update",update);

//****AddStaff*****//
router.post("/addProjectStaff",addProjectStaff);

//****RemoveStaff*****//
router.post("/removeProjectStaff",removeProjectStaff);

//****getSingleProjectDetails*****//
router.post("/getSingleProject",getSingleProjectDetails);



module.exports = router;
//****ImportingPackages*****//
const express = require("express");
const { getProjectList, addProjectList } = require("../controllers/listController");
const router = express.Router();


//***getProjectsList*****//
router.post("/getProjectList", getProjectList);


//***addProjectList*****//
router.post("/addProjectList", addProjectList);




module.exports = router;
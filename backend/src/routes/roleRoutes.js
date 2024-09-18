//*****ImportingPackages*****//
const express = require("express");
const { createRole, getRoles, getRoleDetails, updateRole } = require("../controllers/roleController");
const router = express.Router();


//****createRole*****//
router.post("/create", createRole);

//****updateRole*****//
router.post("/update", updateRole);

//***getRoles******//
router.get("/get", getRoles);

//***getRoleDetails******//
router.post("/get/details", getRoleDetails);

module.exports = router;    
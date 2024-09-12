//****ImportingPackages*****//
const express = require("express");
const { getClients, create, getClientDetails, deleteClients, updateClient } = require("../controllers/clientController");
const router = express.Router();
const upload = require("../config/multerConfig");


//***getClients*****//
router.post("/getClients", getClients);

//***getClientDetails******//
router.post("/get/details", getClientDetails);

//***deleteClient*****//
router.post("/delete", deleteClients);

//****Create*****//
router.post("/create", upload.single("Profile"), create);

//****Update*****//
router.post("/update", upload.single("Profile"), updateClient);

module.exports = router;
//****ImportingPackages*****//
const express = require("express");
const { getClients, create } = require("../controllers/clientController");
const { single } = require("../config/multerConfig");
const router = express.Router();

//***getClients*****//
router.post("/getClients",getClients);

//****Create*****//
router.post("/create",single(''),create);

module.exports = router;
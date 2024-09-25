//****ImportingPackages*****//
const express = require("express");
const { getTasks } = require("../controllers/taskController");
const router = express.Router();


//***getTasks*****//
router.post("/getTasks", getTasks);




module.exports = router;
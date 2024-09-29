//****ImportingPackages*****//
const express = require("express");
const { getTasks, addTask, moveTaskList, updateTask } = require("../controllers/taskController");
const router = express.Router();


//***getTasks*****//
router.post("/getTasks", getTasks);


//****AddTask*******//
router.post("/addTask",addTask);

//****UpdateTask*******//
router.post("/updateTask",updateTask);

//****MoveTaskList*******//
router.post("/moveTaskList",moveTaskList);



module.exports = router;
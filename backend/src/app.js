//****ImportingPackages******//
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { limiter } = require('./utils/rateLimiter');
const connectDB = require('./config/database');
const port = process.env.PORT;
const deviceDetect = require("mobile-detect");
const path = require("path");
const morgan = require("morgan");




//****DBConnection*****//
connectDB();


//*****Middlewares*****//
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(morgan());


//***RouteSettings*******//
const roleRoutes = require("./routes/roleRoutes");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const projectRoutes = require("./routes/projectRoutes");


app.use("/auth", authRoutes);
app.use("/client", clientRoutes);
app.use("/role", roleRoutes);
app.use("/project", projectRoutes);

//****TestAPI*****//
app.get("/", (req, res) => {
    const checkDevice = new deviceDetect(req.headers['user-agent']);
    if (checkDevice.mobile()) {
        return res.status(200).json({
            sucess: true,
            message: "WELCOME TO TASK MANGEMENT BACKEND!",
        })
    } else {
        console.log(checkDevice);
        return res.send("WELCOME TO TASK MANAGEMENT SYSTEM")
    }

})

//****No-Route-Found******//
app.all("/*", (req, res) => {
    return res.status(400).json({
        success: false,
        error: "No Route Found!"
    });
});


//****Listening*****//
app.listen(port, () => {
    console.log(`Listening on port no : ${port}`)
})
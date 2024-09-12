//****ImportingPackages******//
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { limiter } = require('./utils/rateLimiter');
const connectDB = require('./config/database');
const port = process.env.PORT;


//*****Middlewares*****//
app.use(cors());
app.use(express.json());
app.use(limiter);


//****DBConnection*****//
connectDB();

//***RouteSettings*******//
const roleRoutes = require("./routes/roleRoutes");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const { authToken } = require('./middlewares/authMiddleware');

app.use("/auth", authRoutes); 
app.use("/client",clientRoutes);
app.use("/role",authToken, roleRoutes);

//****TestAPI*****//
app.get("/", (req, res) => {
    return res.status(200).json({
        sucess: true,
        message: "WELCOME TO TASK MANGEMENT BACKEND!"
    })
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
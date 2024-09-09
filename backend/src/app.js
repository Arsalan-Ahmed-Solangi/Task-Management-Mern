//****ImportingPackages******//
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;






//****TestAPI*****//
app.get("/", (req, res) => {
    return res.status(200).json({
        sucess: true,
        message: "WELCOME TO AI IMAGE GENERATION BACKEND!"
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
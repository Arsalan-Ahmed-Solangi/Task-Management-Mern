//****ImportingPackages****//
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = (toEmail, subject, body) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `PROJECT MANAGEMENT APP <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: subject,
        text: body,
        // html: '<p>' + body + '</p>' 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
}

module.exports = sendMail;
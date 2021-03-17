const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');

async function registerMail(userMail, userName, userRegNo) {
    let transporter = nodemailer.createTransport({
        // host: "ssl://smtp.gmail.com",
        // port: 465,
        service: 'gmail',
        //secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USERNAME, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        }
    })

    let mailOptions = {
        from: '"No-Reply SmartCampus"', // sender address
        to: userMail, // list of receivers
        subject: "Account Activation", // Subject line
        html: "<b>Dear "+ userName +"</b> Your Reg No is "+ userRegNo +" Please activate your account by clicking on the link below.<a href='google.com'>Click here..</a>  <br> Thanks" // html body 
    };

    transporter.sendMail(mailOptions, function (error, data) {
        if(error){
            return res.status(501).json({
                message: error
            });
        }
        else{
            return res.status(501).json({
                message: 'Mail Sent Successfully'
            }); 
        }
    });  
};

module.exports = {registerMail}
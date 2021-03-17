module.exports = (app) => {
    const express = require('express');
    const dotenv = require('dotenv').config();
    const bcrypt = require('bcryptjs');
    // const expressValidator = require('express-validator');
    // const mysql = require('mysql');
    const bodyParser = require('body-parser');
    const Joi = require('joi');
    const nodemailer = require('nodemailer');
    const jwt = require('jsonwebtoken');
    const multer = require('multer');
    const path = require('path');
    const db = require('../connection');
    const Users = require('../models/Users');
    const mailer = require('../helpers/mailer');
    const randomstring = require("randomstring");

    app.post('/login', (req, res, next) => {

    });

    // ---------------------------------------------

    app.post('/register', async (req, res, next) => {
        // validate
        const schema = Joi.object({ 
            name: Joi.string().required().messages({
                'string.base': `"name" should be a type of 'text'`,
                'string.empty': `"name" cannot be an empty field`,
                'string.min': `"firstname should have a minimum length of {#limit}`,
                'any.required': `"name" is a required`,
            }),
            reg_no: Joi.string().required().min(6),
            email: Joi.string().min(6).required().email(),
            gender: Joi.string().required(),
            role: Joi.string().required(),
            status: Joi.number().required(),
            school_id: Joi.string().required(),
            level_id: Joi.string().required(),
            semester_id: Joi.string().required(),
            password: Joi.string().min(5).required(),  
            confirm_pass: Joi.string().min(5).required().valid(Joi.ref('password'))
        });

        const {value, error} = schema.validate(req.body);
        if(error && error.details){
            return res.status(400).json({message: error.details[0].message});
        }
        else{
            const findUser = await Users.findOne({ where: { email: req.body.email } });
            if (findUser) {
                return res.status(200).json({
                    message: 'User Already Exist',
                }) 
            } else { 
                let hashedPassword = await bcrypt.hash(req.body.password, 8);
                // generate random string
                let uuid = randomstring.generate(24);

                let data = {
                    name: req.body.name,
                    email: req.body.email,
                    uuid: uuid,
                    reg_no: req.body.reg_no,
                    gender: req.body.gender,
                    role: req.body.role,
                    status: req.body.status,
                    school_id: req.body.school_id,
                    level_id: req.body.level_id,
                    semester_id: req.body.semester_id,
                    password: hashedPassword
                }

                const addUser = await Users.create(data); //add user

                if(addUser){
                    let sendMail = await mailer.registerMail(req.body.email, req.body.name, req.body.reg_no); //send mail to user
                    
                    if(sendMail){
                        return res.status(200).json({
                            message: 'User Created and Mail sent'
                        });
                    }
                    else{
                        return res.status(200).json({
                            message: 'User Created'
                        });
                    }
                }
                else{
                    return res.status(400).json({
                        message: 'An Error Occured'
                    })
                }
            }
        }
    });

    // ---------------------------------------------------------------------------------------------

    app.get('/login', async (req, res) => {
        return res.json({
            message: 'Hello',
            status: 'success'
        })
    });

}

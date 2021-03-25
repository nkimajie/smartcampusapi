const Schools = require('../models/Schools');

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
    const Schools = require('../models/Schools');
    const mailer = require('../helpers/mailer');
    const randomstring = require("randomstring");
    const moment = require('moment'); // require
    const tokenCheck = require('../helpers/verifyToken');

     

    // ---------------------------------------------

    app.post('/school/create', tokenCheck.verifyToken, (req, res) => {
        //check token
        jwt.verify(req.token, process.env.JWT_SECRET_TOKEN, async(err, results) => {
            if(err){
                res.sendStatus(403)
            }
            else{
                // start
                // validate
                const schema = Joi.object({ 
                    school: Joi.string().required().min(5),
                    aka: Joi.string().required(),
                    city: Joi.string().required(),
                    Authorization: Joi.string().required()
                });

                const {value, error} = schema.validate(req.body);
                if(error && error.details){
                    // return res.status(406).json({message: error.details[0].message});
                    return res.json({message: error.message});
                }
                else{
                    const findUser = await Schools.findOne({ where: { school_name: req.body.school } });
                    if (findUser) {
                        return res.status(200).json({
                            message: 'School Already Exist',
                            status: 'error'
                        }) 
                    } 
                    else { 
            
                        let data = {
                            school_name: req.body.school,
                            aka: req.body.aka,
                            city: req.body.city,              
                        }

                        const addSchool = await Schools.create(data); //add user

                        if(addSchool){            
                            return res.status(200).json({
                                message: 'School Created',
                                status: 'success'
                            });
                            }
                        else{
                            return res.status(400).json({
                                message: 'An Error Occured',
                                status: 'error'
                            })
                        }
                    }
                }
            }
        })
    });

    // ---------------------------------------------------------------------------------------------

    app.get('/school/getAll', tokenCheck.verifyToken, (req, res) => {
        jwt.verify(req.token, process.env.JWT_SECRET_TOKEN, async(err, results) => {
            if(err){
                res.sendStatus(403)
            }
            else{
                const getSchool = await Schools.findAndCountAll();
                if(getSchool){
                    return res.status(200).json(
                        {
                            data: getSchool,
                            status: 'success'
                        }
                    )
                }
                else{
                    return res.status(200).json(
                        {
                            status: 'error'
                        }
                    )
                }
            }
        })
    })

}

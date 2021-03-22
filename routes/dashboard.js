const express = require('express');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const tokenCheck = require('../helpers/verifyToken');
const Users = require('../models/Users');
const router = express.Router();

router.get('/', tokenCheck.verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_TOKEN, async(err, results) => {
        if(err){
            res.sendStatus(403)
        }
        else{
            res.status(200).json({
                message: 'You are in the dashboard',
                status: 'success'
            })
        }
    })
});

// ----------------------------------------------

router.get('/getUser', tokenCheck.verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_TOKEN, async(err, results) => {

        if(err){
            res.status(403);
        }
        else{
            const user = await Users.findOne({where: {id: results.user.id}})
            res.json({
                message: 'success',
                user
            })
        }
    })
});

// -----------------------------------------------------

module.exports = router ;

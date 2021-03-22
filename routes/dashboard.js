const express = require('express');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const tokenCheck = require('../helpers/verifyToken');
const Users = require('../models/Users');
const router = express.Router();

router.get('/', tokenCheck.verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_TOKEN, async(err, results) => {
        if(err){
            res.status(403)
        }
        else{
            const user = await Users.findOne({where: {id}})
            let data = {
                'id' : user.id,
                'name' : user.name,
                'email' : user.email,
                'uuid' : user.uuid,
                'reg_no' : user.reg_no,
                'school_id' : user.school_id, 
                'level_id' : user.level_id,
                'semester_id': user.semester_id
            }
            res.json({
                message: 'You are in the dashboard',
                data
            })
        }
    })
});

// ----------------------------------------------

router.get('/getUser', (req, res) => {
    
})

module.exports = router ;

const  sequelize  = require('sequelize');
const db = require('../connection');

const Users = db.define('tbl_users',{
    uuid: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    reg_no: {
        type: sequelize.STRING
    },
    name: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING,
        allowNull: false

    },
    role: {
        type: sequelize.STRING
    },
    status: {
        type: sequelize.STRING
    },
    school_id: {
        type: sequelize.STRING
    },
    level_id: {
        type: sequelize.STRING
    },
    semester_id: {
        type: sequelize.STRING
    },
    profile_pics: {
        type: sequelize.STRING
    },
    password: {
        type: sequelize.STRING
    },
});

Users.sync({false: true})

module.exports = Users;
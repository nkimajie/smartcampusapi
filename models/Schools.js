const  sequelize  = require('sequelize');
const db = require('../connection');

const Schools = db.define('tbl_schools',{
    school_id: {
        type: sequelize.STRING,
        primaryKey: true
    },
    school_name: {
        type: sequelize.STRING,
        allowNull: false,
        // unique: true
    },
    aka: {
        type: sequelize.STRING
    },
    city: {
        type: sequelize.STRING
    },
});

Schools.sync({false: true})

module.exports = Schools;
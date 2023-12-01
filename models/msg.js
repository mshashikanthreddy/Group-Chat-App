const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Msg = sequelize.define('message',{

    msgId : {
        type : Sequelize.INTEGER ,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true 
    },

    username : {
        type : Sequelize.STRING ,
        allowNull : false 
    },

    msg : {
        type : Sequelize.STRING ,
        allowNull : false 
    }

})

module.exports = Msg;
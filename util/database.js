const mysql = require('mysql2');
const Sequelize = require('sequelize');


const pool = mysql.createPool({    
    host : 'localhost' ,
    user : 'root' ,
    database : 'groupchat-app',
    password : 'Shashi@2000'
}) 
const sequelize = new Sequelize('groupchat-app','root','Shashi@2000',{
    dialect: 'mysql',
    host : 'localhost'
});

module.exports = pool.promise();
module.exports = sequelize;

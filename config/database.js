require('dotenv').config();
const {Sequelize}= require('sequelize');
const config = require('./config');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
    }
);
sequelize.authenticate() 
    .then(() => {
        console.log('db connection success');
    })
    .catch((error) => {
        console.log('db connection failed');
    });

module.exports = {
    sequelize,
    Sequelize
}
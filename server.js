require('dotenv').config();
const express = require('express');

const {sequelize} = require('./config/database');
const session = require ('express-session');
const bodyParser = require('body-parser');

const authRoute = require('./routes/accountRoutes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRoute);
app.use(session({ 
    secret: process.env.secret,
    resave: false,  
    saveUninitialized: true  
}));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
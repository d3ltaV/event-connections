
const { Sequelize, Op} = require('../config/database');
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const register = async(req, res) => {
    try {
        const usersEmail = await Users.findOne({
            where: {
                email: req.body.email
            }
        });
        const usersUser = await Users.findOne({
            where : {
                username: req.body.username
            }
        })
        if (!usersEmail && !usersUser) {
            const passwordHash = await bcrypt.hash(req.body.password, 10);
            await Users.create({
                username: req.body.username,
                email: req.body.email,
                password: passwordHash,
            });
            //return res.redirect('/login');
            return res.status(201),send("Registration successful!");
        } else if (usersEmail && usersUser) {
            res.status(400).send("Email and username already taken!");
        } else if (usersUser) {
            res.status(400).send('Username already taken!');
        } else {
            res.status(400).send('Email already taken!');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Registration error");
    }
}   

const login = async(req, res) => {
    try {
        const user = await Users.findOne({
            where : {
                [Sequelize.Op.or]: [
                    {email: req.body.email}, 
                    {username: req.body.username}
                ]
            }
        });
        if (!user) {
            res.status(400).send("Please create an account!");
        } else {
            const match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                req.session.userId = user.id;
                req.session.email = user.email; //set up session in srever.js
                return res.redirect('/');
            } else {
                return res.status(400).send("Incorrect password!");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Login error");
    }
}
module.exports = {
    register,
    login
}
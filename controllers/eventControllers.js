const {Sequelize, Op} = require('../config/database');
const Users = require('../models/users');
const Events = require('../models/events');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');

const addEvent = async (req, res) => {
    try {
        const {title, description, category, date, location, createdBy} = rqe.body;
        const newEvent = await Events.create({
            title, 
            description,
            category,
            date, 
            location,
            createdBy,
        });
        return res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
    }
}
const getMyEvents = async(req, res) => {
    try {
        const myEvents = await Events.findAll({
            where : {
                createdBy: req.session.userId
            }
        });
        res.render('myEvents', {events});
    } catch (error) {
        console.error(error);
        res.status(500).send('error:' + error);
    }
}
const search = async(req, res) => {
    try {
        const keywords = req.query.keywords.split(' ').map(word => word.toLowerCase());
        if (keywords.length === 0) {
            return res.status(400).json({ error: 'No keywords provided for search.' });
        }
        const filteredEvents = await Events.findAll({
            where : {
                [Op.or]: keywords.map(keyword=> ({
                        [Op.or]: [
                            { title: { [Op.like]: `%${keyword}%` } },
                            { description: { [Op.like]: `%${keyword}%` } }, 
                            { category: { [Op.like]: `%${keyword}%` } },
                        ]
                }))
            }
        });
        res.render('search', {filteredEvents});
    } catch (error) {
        console.error(error);
        res.status(500).send('error:' + error);
    }
}

// const filterBy = async(req, res) => {
//     try {
//         const {startDate, endDate, cat} = req.body;
//         const now = new Date();
//         const curr = now.toISOString().split('T')[0];
//         const next30 = new Date(now.setDate(now.getDate() + 30)).toISOString().split('T')[0];
//         const conditions = { 
//             [Op.and]: []
//         }
        
//         const filteredEvents = await Events.findAll({
//             where : {
//                 [Op.and]: [
//                     {}
//                 ]
//             }
//         })
//     }
// }
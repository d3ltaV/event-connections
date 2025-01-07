const authController = require('../controllers/authenticationController');
const express = require('express');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// router.get('/register', (req, res) => {
//     res.render('register');
// });
// router.get('/login', (req, res) => {
//     res.render('login');
// })
// module.exports = router;
const express = require('express');
const router = express.Router();
const userContoller = require('../controllers/user.controller');
const {body} = require('express-validator');

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('name').isLength({min: 3}).withMessage('Name must be atleast 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long')
], userContoller.registerUser);
module.exports = router;

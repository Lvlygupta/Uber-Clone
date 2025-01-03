const express = require('express');
const router = express.Router();
const userContoller = require('../controllers/user.controller');
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('name').isLength({min: 3}).withMessage('Name must be atleast 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long')
], userContoller.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long')
], userContoller.loginUser);    

router.get('/profile',authMiddleware.authUser,userContoller.getUserProfile);
router.get('/logout',authMiddleware.authUser,userContoller.logoutUser);

module.exports = router;

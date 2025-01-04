const { validationResult } = require('express-validator');
const driverModel = require('../models/driver.model');
const driverService = require('../services/driver.service');
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerDriver = async(req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    console.log(errors);
   return res.status(400).json({ errors: errors.array() });
}
const {name , email , password  , vehicle} = req.body;

   const hashpassword = await driverModel.hashpassword(password);
   const driver = await driverService.createDriver({
    name , email , password:hashpassword, numberPlate:vehicle.numberPlate , type:vehicle.type
   })
   const token = await driver.getSignedToken();
   res.cookie('token',token);
   return res.status(201).json({token,driver});
}

module.exports.loginDriver = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    const driver = await driverModel.findOne({email}).select('+password');
    if(!driver){
      return res.status(401).json({errors:[{msg:'Invalid Credentials'}]});
    }
    const isMtached = await driver.matchPassword(password);
    if(!isMtached){
      return res.status(401).json({errors:[{msg:'Invalid Credentials'}]});
    }
    const token = await driver.getSignedToken();
    res.cookie('token',token);
        res.status(200).json({token,driver});
}

module.exports.getDriverProfile = async(req,res)=>{
   res.status(200).json(req.driver);
}

module.exports.logoutDriver = async(req,res)=>{
    res.clearCookie('token');
        const token =  req.cookies.token || req.headers.authorization.split(' ')[1];
        await blacklistTokenModel.create({token});
        res.status(200).json({msg:'Logged Out'});
}
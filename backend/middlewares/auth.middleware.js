const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require("../models/blacklistToken.model");
const driverModel = require("../models/driver.model");


module.exports.authUser = async (req,res,next)=>{
  
    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const isBlackListed = await blacklistTokenModel.findOne({token:token});
    if(!token || isBlackListed){
        return res.status(401).json({msg:'Unauthorized'});
    }

    

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
       
        const user = await userModel.findById(decoded.id);
       
        
       
        
        req.user = user;
        return next();
    }
    catch(err){
        return res.status(401).json({msg:'Unauthorized'});
    }
}

module.exports.authDriver = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const isBlackListed = await blacklistTokenModel.findOne({token:token});
    if(!token || isBlackListed){
        return res.status(401).json({msg:'Unauthorized'});
    }

try{

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
           
        
    const driver = await driverModel.findById(decoded.id);
    req.driver = driver;
    return next();

}
catch(err){
    return res.status(401).json({msg:'Unauthorized'});
}
}
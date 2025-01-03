const mongoose = require('mongoose');
const driverModel = require('../models/driver.model');

module.exports.createDriver = async ({name,email,password,numberPlate,type}) =>{
    
    console.log({name,email,password,vehicle:{numberPlate, type}});
    if(!name || !email || !password || !numberPlate || !type){
        throw new Error('All fields are required');
    }
    try{
        const driver = await driverModel.create({ name , email , password ,vehicle:{numberPlate, type}});
        return driver;
    }
    catch(err){
        throw new Error(err.message);
    }
}
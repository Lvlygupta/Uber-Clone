const mongoose = require('mongoose');
const userModel = require('../models/user.model');
module.exports.createUser = async ({name,email,password}) =>{
    
    if(!name || !email || !password){
        throw new Error('All fields are required');
    }
    try{
        const user = await userModel.create({name, email, password});
        return user;
    }
    catch(err){
        throw new Error(err.message);
    }
}
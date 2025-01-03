const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    socketId:{
        type: String
    }
})

userSchema.statics.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.getSignedToken = async function(){  
    return await jwt.sign({id: this._id},process.env.JWT_SECRET);
}
userSchema.statics.hashpassword = async function(password){
    return await bcrypt.hash(password,10);
}
module.exports = mongoose.model('user',userSchema);
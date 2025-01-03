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

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.getSignedToken = async function(){  
    return await jwt.sign({id: this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
}
userSchema.statics.getAuthToken = async function(){
    return await jwt.sign({id: this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
}
userSchema.statics.hashpassword = async function(password){
    return await bcrypt.hash(password,10);
}
module.exports = mongoose.model('user',userSchema);
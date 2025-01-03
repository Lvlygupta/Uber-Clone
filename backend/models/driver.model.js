const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const driverSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    vehicle: {
        type: {
            type: String,
            required: true,
            enum: ['car', 'moto', 'auto']
        },
        numberPlate: {
            type: String,
            required: true
        }
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    socketId: {
        type: String
    }
});

driverSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
driverSchema.methods.getSignedToken = async function(){  
    return await jwt.sign({id: this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
}
driverSchema.statics.getAuthToken = async function(){
    return await jwt.sign({id: this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
}
driverSchema.statics.hashpassword = async function(password){
    return await bcrypt.hash(password,10);
}
module.exports = mongoose.model('driver', driverSchema);
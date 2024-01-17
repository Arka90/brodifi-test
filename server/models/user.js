const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true , "A user must have a user name"],
    },
    password:{
        type:String,
        required:[true , "A user must have a password"]
    },

    
})



const User = mongoose.model('User', userSchema);

module.exports = User;
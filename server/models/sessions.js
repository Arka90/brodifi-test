const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user:{
        type:String,
    },
    logoutTime:{
        type: Number
    },
    priority:{
        type:Number
    },
})






const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
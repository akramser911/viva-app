const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema ({
    //username:{type : String},
    firstName : {type : String},
    lastName : {type : String},
    email:{
        type : String,
        required : true,
        max : 50,
        unique : true
    },
    password:{
        type : String,
        required : true,
        min : 6
    }
},{timestamps : true}
);
module.exports = mongoose.model('User', UserSchema);
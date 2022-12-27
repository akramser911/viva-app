const mongoose = require('mongoose');

const projects = mongoose.Schema({
    superName : {type : String},
    superMark : {type : Number},
    presName : {type : String},
    presMark : {type : Number},
    examName : {type : String},
    examMark : {type : Number},
    finalMark : {type : Number},
    studentOne : {type : String},
    studentTwo : {type : String},
    studentThree : {type : String},
    owner : {type: mongoose.Types.ObjectId, ref: "User"}
})

module.exports = mongoose.model('PROJECTS', projects);
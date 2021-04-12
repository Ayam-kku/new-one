const mongoose = require('mongoose');

var college = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    building: {
        type : String,
        required: true
    },
    link: {
        type : String,
        required: true
    }
})

const adminCollege = mongoose.model('admincollagedb', college);

module.exports = adminCollege;
const mongoose = require('mongoose');

var department = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    building: {
        type : String,
        required: true
    },
    college: {
        type : String,
        required: true,
    },
    link: {
        type : String,
        required: true
    }
})

const adminDepartmentdb = mongoose.model('adminDepartmentdb', department);

module.exports = adminDepartmentdb;
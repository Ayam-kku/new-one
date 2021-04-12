const mongoose = require('mongoose');

var committee = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    description: {
        type : String,
        required: true
    },
    task:{
        type : Array,
        required: true
    },
})

const adminCommittee = mongoose.model('adminCommitteedb', committee);

module.exports = adminCommittee;
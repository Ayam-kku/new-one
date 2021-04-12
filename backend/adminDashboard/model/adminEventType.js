const mongoose = require('mongoose');

var eventType = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    description: {
        type : String,
        required: true
    },
})

const adminEventType = mongoose.model('adminEventTypedb', eventType);

module.exports = adminEventType;
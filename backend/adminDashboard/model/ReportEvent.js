const mongoose = require('mongoose');

var myDateString = Date("<YYYY-mm-dd>");

var reportEvent = new mongoose.Schema({
    name : {
        type : String,
        default: ""
    },
    eventPlace: {
        type : String,
        default: ""
    },
    eventHours: 
        {
        type : String,
        default: ""
        },
        evenDate: 
        {
        type : String,
        default: ""
        },
        eventType: 
        {
        type : String,
        default: ""
        },
    eventInformation:{
        type: String, 
        default: ""
    },
    eventIntroduction:{
        type: String, 
        default: ""
    },
    eventBeneficiaries :{
        type: String, 
        default: ""
        },
    eventOrganizers :{
        type: String,
        default:"" 
        },
        Userimg :{
        type:"String",
        default:""
    },
    creatDate:{
        type: String, 
        default: myDateString
    }
})

const reportEventdb = mongoose.model('reportEventdb', reportEvent);

module.exports = reportEventdb;
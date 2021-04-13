const mongoose = require('mongoose');

var myDateString = Date("<YYYY-mm-dd>");

var clubPurchases = new mongoose.Schema({
    eventName : {
        type : String,
        default: ""
    },
    product: {
        type : String,
        default: ""
    },
    price :{
        type: Number,
        default: 0 
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

const clubPurchasesdb = mongoose.model('clubPurchasesdb', clubPurchases);

module.exports = clubPurchasesdb;
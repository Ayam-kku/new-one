const mongoose = require('mongoose');

var myDateString = Date("<YYYY-mm-dd>");

var admin = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    password: {
        type : String,
        required: true
    },
    usertype: 
        {
            type : String,
            required: true
        },
        postion:{
            type: Object,
            default:{ clubName:"",typePos:"" }
        },
    jobID:{
            type: Number,
            default:0
    },
    uniID:{
            type: Number,
            default:0
        },
    major:{
            type: String,
            default:"" 
        },
    level:{
            type: Number,
            default:0
        },
    qualification:{
            type: String,
            default:""
        },
    officeNo:{
            type: String,
            default:""
        },  
    email : {
        type: String,
        required: true,
        unique: true
    },
    college : {
        type: String,
        default: ""
    },
    phone : {
        type: Number,
        required: true,
        unique: true
    },
    status : String,
    Userimg :{
        type:"String",
        default:""
    },
    regdate:{
        type: String, 
        default: myDateString
    }
})

const adminUserdb = mongoose.model('adminuserdb', admin);

module.exports = adminUserdb;
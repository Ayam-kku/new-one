const mongoose = require('mongoose');

var club = new mongoose.Schema({
    clubName: {
        type : String,
        
    },
    clubType: {
        type : String,
        default:'Centralized'
    },
    college: {
        type : Object, 
    },
    pioneer:{
        type : Object,
        
    },
    statusofplan:{
        type : String,
        default:"Edit"
    },
    notefromstu:{
        type : String,
        default:"" 
    },
    notefrompioneer:{
        type : String,
        default:""
    },
    locationClub:{
        type : String,
        default:""
    },
    Ext:{
        type : String,
        default:""
    },
    president: {
        type : Object,
        
     },
     activeClub: {
        type : String,
        default:"true"
     },
    member:{
        type : Array,
        
     },
     clubInfo:{
         type : Object,
         default:{
            vision: "",
            message: "",
            objectives: [],
            value: [],
        }
    },
    Userimg :{
        type:"String",
        default:""
    },
	event:{
        type : Array,
     },
    
})

const sauClubdb = mongoose.model('sauClubdb', club);

module.exports = sauClubdb;
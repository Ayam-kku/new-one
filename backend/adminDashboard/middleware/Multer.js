const multer = require('multer');
const path = require('path')
// set storage
var storage = multer.diskStorage({
    destination : function ( req , file , cb ){
        cb(null, './uploads/')
    },
    filename : function (req, file , cb){
        // image.jpg
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        cb(null, file.name + '-' + Date.now() + ext)
    }
})

module.exports = store = multer({ storage : storage })
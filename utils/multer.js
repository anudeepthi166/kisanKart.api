const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadPath)
    },
    filename: function(req,file,cb){
        cb(null, Date.now()+path.extname(file.originalname))
}})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }
    else{
        cb(new Error('ONly images are allowed!', false))
    }
}

const upload = multer({storage, fileFilter})
module.exports = upload;
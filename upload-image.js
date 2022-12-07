const express = require('express')
const path = require('path')
const multer = require('multer');
var fs = require('fs');
const app = express()

const multerMiddleWareStorage = multer.diskStorage({
    destination: (req, res, callBack) => {
        callBack(null, 'image-uploads/')
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + path.extname(file.originalname))
    }
});
const fileFilter = (req, file, callBack) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        callBack(null, true)
    } else {
        // console.log('Only Images Allowed')
        // res.json('Only Images Allowed')
        callBack(null, false)
    }
}

const upload = multer({
    storage: multerMiddleWareStorage,
    limits: {
        fileSize: 1000000000 // 1000000000 Bytes = 1000 MB 
    },
    fileFilter: fileFilter,
})

const UploadImage = app.post('/', upload.single('image'), (req, res) => {
    try {
        // fs.unlinkSync('image-uploads\\1667388070942.jpg');
        // console.log('File deleted!');
        const imageUpload = req.file.path
        console.log(req.file.path)
        if(req.file.path===null){
            res.json({message:"Only Image File Allowed"})
        }else{
            res.json(imageUpload)
        }
    } catch (error) {
        res.send(error)
    }
})
module.exports = UploadImage

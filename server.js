const express = require('express')
const multer = require('multer')
var path = require('path');

const app = express()

// storage property takes a storage engine that we are going to create 
// destination string is the direct path from this server file to wherever we want to save our uploading files

const fileStorageEngine = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , './images')
    },
    filename : (req , file , cb) => {
        cb(null , file.originalname + " -- "+ Date.now())
    }
})
const fileFilter = function (req, file, cb) {
    if (file.mimetype.split('/')[1] !== 'pdf') {
      return cb(new Error('Only pdfs are allowed') , false)
    }
    cb(null, true)
}

const upload = multer({storage : fileStorageEngine})
//fileFilter : fileFilter


// route
// upload.single - it tells malter only one file is going to be sent
app.post('/saveFile' , upload.single('image') ,async (req, res) => {
    try {
        if (!req.file) {
            console.log(`Please select a pdf file`)
           return res.status(400).json({success : false , data : 'Please select a pdf file'})
        }else if(req.file.mimetype.split('/')[1] !== 'pdf') {
            console.log(`Only pdf file are allowed`)
            return res.status(400).json({success : false , data : 'Only pdf file are allowed'})
        }else{
            return res.status(200).json({success : true , data : 'Upload successfully'})
          }
        
    } catch (error) {
        return res.status(200).json({success : false , data : error})
    }
})

app.listen(5000)

// 3 ways to handling uploads
// saving the file directly on to your server
// saving the file's binary data or base64 string data in a database
// using aws s3 buckets to save and manage your files

// multer is a node middleware for handling the multi-part form data (any files i.e., images, pdfs, zips)


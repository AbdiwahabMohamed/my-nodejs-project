const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, './image'))
    },
    fileName: function(req, file, cb){
        cb(null, new date().toISOString().replace('/:/g', '-') + file.originalname)
    }
})

const upload = multer({ storage}) // storage: (multer) storage


router.post('/',upload.single('Images'), (req, res) => {
    res.status(200).json({ message: 'image uploaded' })
})



module.exports = router
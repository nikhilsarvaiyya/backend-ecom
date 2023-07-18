const express = require('express');
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const date = new Date();
        let time = date.getTime()
       
        cb(null, time+'_'+ file.originalname)
    }
})
router.post('/', uploadImage);

function uploadImage(req, res, next) {
    const upload = multer({ storage }).array('images', 5)
    upload(req, res, function (err) {
        if (err) {
            return res.send(err)
        }
        return res.json(req.files)
    })
}

module.exports = router;
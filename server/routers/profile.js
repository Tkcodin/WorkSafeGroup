const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});
const upload = multer({ storage: storage });

//1 st step
const express = require("express");

//2nd step
const router = express.Router()

//3rd step
const profileController = require('../controllers/profile')

//4th step
router.post('/profile', profileController.newProfile)
router.get('/profile', profileController.getProfile)
router.post('/newcontent',upload.single('Image'),profileController.newContent)
router.get('/getcontent',profileController.getContent)
router.post('/newcomment',profileController.newComment)
router.get('/getcomments',profileController.getComment)
router.post('/newuser',profileController.newUser)
router.get('/getuser',profileController.getUser)


//5th step
module.exports=router 
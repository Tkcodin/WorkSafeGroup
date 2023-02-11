const multer = require('multer');
const path = require('path'); // a Node.js built-in module for working with file and directory paths
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage, 
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
          return cb(new Error('Only images are allowed'))
        }
        cb(null, true)},
    });

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
router.post('/newComment/:id',profileController.newComment)
router.get('/getcomments',profileController.getComment)
router.post('/newuser',upload.single('Image'),profileController.newUser)
router.get('/getuser/:email',profileController.getUser)
 router.get('/getmycontent/:id', profileController.getMyContent)
 router.post('/updatelikes/:id',profileController.updatelikes)
 router.get('/getMyLikes/:id',profileController.getMyLikes)
 router.get('/getuserWithID/:userID',profileController.getUserWithID)

 router.post('/edituser/:userID',upload.single('Image'),profileController.editUser)

 router.post('/setTags',profileController.setTags)
 router.get('/getTags',profileController.getTags)


//5th step
module.exports=router
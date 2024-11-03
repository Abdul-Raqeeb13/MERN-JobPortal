const express = require("express")
const router = express.Router()
const {signup, login} = require('../controllers/authController')
const {userViewJobs, userapplyjob, userAppliedJobs} = require('../controllers/userController')
const {userMiddleware} = require("../middleware/userMiddleware")
// const multer = require("multer");
// const path = require("path");

// Multer storage setup
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "UsersProfiles/");
//     },
//     filename: function(req, file, cb) {
//         const uniqueString = Date.now() + "-" + Math.round(Math.random() * 1E9);
//         const ext = path.extname(file.originalname);  // Use path module to handle file extensions
//         cb(null, "Image-" + uniqueString + ext);
//     }
// });

// Initialize upload with storage
// const upload = multer({ storage: storage });

// routes.js

const multer = require("multer");
const path = require("path");

// Multer storage setup
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        const uniqueString = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);  // Use path module to handle file extensions
        cb(null, "Image-" + uniqueString + ext);
    }
});

// Initialize upload with storage
const upload = multer({ storage: storage });

router.post('/signup' , upload.single("UserCV") , signup)
// router.post('/signup' ,upload.single("UserCV"), async (req, res) => {
//     console.log("hi");
    
//     console.log('Request Body:', req.body);  // Log request body
//     console.log('Uploaded File:', req.file);  // Log uploaded file
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
    
// })
router.post('/login' ,  login)

router.get('/userViewJobs',userMiddleware, userViewJobs)
router.post('/applyjob',userMiddleware, userapplyjob)
router.get('/userappliedjobs',userMiddleware, userAppliedJobs)

module.exports = router
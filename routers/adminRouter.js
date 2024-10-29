const express = require("express")
const router = express.Router()
const { adminMiddleware } = require("../middleware/adminMiddleware")
const { adminAddJobs, adminViewJobs, adminDeleteJobs, adminAppliedJobs, adminAcceptJobs } = require("../controllers/adminController")

// router.get('/adminaddobs', adminMiddleware,adminAddJobs)
router.post('/adminaddjobs', adminMiddleware, adminAddJobs)
router.get('/adminviewjobs', adminMiddleware, adminViewJobs)
router.delete('/admindeletejobs', adminMiddleware, adminDeleteJobs)
router.get('/adminappliedjobs', adminMiddleware, adminAppliedJobs)
router.post('/adminacceptJob', adminMiddleware, adminAcceptJobs)


module.exports = router


const express = require("express")
const router = express.Router()
const { adminMiddleware } = require("../middleware/adminMiddleware")
const {adminAddJobs} = require("../controllers/adminController")

// router.get('/adminaddobs', adminMiddleware,adminAddJobs)
router.post('/adminaddjobs',adminAddJobs)


module.exports = router


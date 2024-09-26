const express = require("express")
const authRouter = require('./authRouter')
const mainrouter = express.Router()
const adminRouter = require('./adminRouter')


mainrouter.use("/user", authRouter)
mainrouter.use("/admin",adminRouter)


module.exports = mainrouter

const express = require("express")
const authRouter = require('./authRouter')
const mainrouter = express.Router()

mainrouter.use("/user", authRouter)



module.exports = mainrouter

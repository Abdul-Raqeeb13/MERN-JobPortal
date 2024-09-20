const mongoose = require('mongoose')
const { model } = require('mongoose')

const authSchema = mongoose.Schema({

    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require:true,
    },
    password : {
        type : String,
        require:true,
    },
    usertype : {
        type : String,
        require:true,
        enum : ['user', 'admin']
    },
    
    // profileId : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "profile" 
    // }
})


const authModel = mongoose.model('auth', authSchema)

exports.findUser = (query) => authModel.findOne(query)

exports.createUser = (obj) => authModel.create(obj)
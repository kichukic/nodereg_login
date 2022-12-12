const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/TEST").then(()=>{
    console.log("Connected to database")
}).catch(()=>{
    console.log("Failed to connect to database")
})

const signupSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})


const collections = new mongoose.model("SignupData",signupSchema)


module.exports = {collections}
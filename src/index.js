const exp = require('constants')
const express =  require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const mongodb = require('./mongodb')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { ifError } = require('assert')

const templatepath =path.join(__dirname,'../templates') 
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan('tiny'))
app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatepath)


app.get("/",(req,res)=>{
    res.render("home")
})


app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.get("/login",(req,res)=>{
    res.render("login")
})


app.post("/signup",async(req,res)=>{
const data ={
    email:req.body.email,
    password:req.body.password}
    console.log(data)
const checkUserExists = await mongodb.collections.findOne({email:req.body.email})
//console.log(checkUserExists)
try {
    if(checkUserExists === null){
        await mongodb.collections.insertMany([data])
        res.render("home")
    }else if(checkUserExists.email === req.body.email){
        res.render("user already exists")
    }
} catch (error) {
    res.render("some  error occured")
}

})


app.post("/login",async(req,res)=>{
    try {
        const checkuser = await mongodb.collections.findOne({email: req.body.email})
        if(checkuser.password === req.body.password){
            res.render("home")
        }else{
            res.render("wrong password")
        }
    } catch (error) {
        res.send("wrong credentials")
    }
})







app.listen(4001,()=>{
    console.log("listening on port 4001")
})
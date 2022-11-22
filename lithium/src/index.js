const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const route=require('./route/route')
const app=express()

app.use(bodyparser.json())

mongoose.connect("mongodb+srv://sarwjeet424:96568437528p@cluster0.8tsocgw.mongodb.net/sarwjeet43",{useNewUrlParser:true})
.then(()=> console.log("MongoDB Connected"))
.catch((err) => console.log(err))

app.listen(3000,function (){
    console.log("Connect to port 3000")
})

app.use('/',route)

const express = require("express")
const fs = require("fs")
const mongoose = require("mongoose")
const { json } = require("stream/consumers")
// const users = require("./MOCK_DATA.json")
// const { use } = require("react")

const app = express()
const port = 8000

//Connection
mongoose.connect('mongodb://127.0.0.1:27017/project02')
.then(()=> console.log("mongodb connect"))
.catch((err)=>console.log("Mongo error: ", err))
//Schema
const userSchema = new mongoose.Schema({
  first_name:{
    type : String,
    require : true,
  },
  last_name:{
    type: String,
    // require :true
  },
  email :{
    type : String,
    require: true,
    unique : true
  },
  job_title:{
    type : String,
  },
  gender :{
    type :String,
    require : true
  }
},{timestamps:true}); //this use for entity created at (time),updated at (time)

const User = mongoose.model("user", userSchema)

app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    console.log("MiddleWare 1");
    fs.appendFile("log.txt", `\n ${Date.now()}, ${req.ip} ${req.method}: ${req.path}`, (errr,data)=>{
        next()

    })
})
app.use((req,res,next)=>{
    console.log("MiddleWare 2");
    next();
})
//Routes
app.get("/users", async(req,res)=>{
    const allDbUsers1 = await User.find({}) 
    const html = `
    <ul>
     ${allDbUsers1.map((allDbUsers1)=>`<li>${allDbUsers1.first_name}</li> \n <li>${allDbUsers1.gender}</li> \n <li>${allDbUsers1.job_title}</li>`)}
    </ul>
    `
    return res.send(html)
})

//get
app.get("/api/users", async(req,res)=>{
     const allDbUsers = await User.find({})  //empty means all the users show
     return res.json(allDbUsers)
})

app.get("/api/users/:id", async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user) {
        return res.status(404).json({ status: "fail", message: "User not found" });
    }
    return res.json(user)
})

app.post("/api/users", async(req,res)=>{
    const body = req.body;
    if(!body ||!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
       return res.status(400).json({msg:"fill all the field"})
    }
    const result =await User.create({
      first_name:body.first_name,
      last_name: body.last_name,
      email : body.email,
      gender : body.gender,
      job_title : body.job_title
    });
    console.log(result)
    return res.json({msg:"success"})   
})

app.patch("/api/users/:id", async(req,res)=>{
    const user = await User.findByIdAndUpdate(req.params.id, {last_name:"Amin"})
    return res.json({status: "success"})
})
app.delete("/api/users/:id", async(req,res)=>{
     const user = await User.findByIdAndDelete(req.params.id)
    return res.json({status: "success"})
})

app.listen(port, ()=>console.log("Server started at"+ port))
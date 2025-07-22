const express = require("express")
const users = require("./MOCK_DATA.json")

const app = express()
const port = 8000

//Routes
app.get("/users", (req,res)=>{
    const html = `
    <ul>
     ${users.map((user)=>`<li>${user.first_name}</li> \n <li>${user.gender}</li> \n <li>${user.job_title}</li>`)}
    </ul>
    `
    return res.send(html)
})

//get
app.get("/api/users", (req,res)=>{
    return res.json(users)
})

app.get("/api/users/:id", (req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=>user.id === id);
    return res.json(user)
})

app.post("/api/user", (req,res)=>{
    //todo:create new user
    return res.json({status: "pending"})
})

app.patch("/api/user/:id", (req,res)=>{
    //todo:edit the user with id
    return res.json({status: "pending"})
})
app.delete("/api/user/:id", (req,res)=>{
    //todo:delete the user with id
    return res.json({status: "pending"})
})

app.listen(port, ()=>console.log("Server started at"+ port))
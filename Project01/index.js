const express = require("express")
const fs = require("fs")
const users = require("./MOCK_DATA.json")
// const { use } = require("react")

const app = express()
const port = 8000
app.use(express.urlencoded({extended:false}))
app.use((req,res,next)=>{
    console.log("MiddleWare 1");
    fs.appendFile("log.txt", `\n ${Date.now()}, ${req.ip} ${req.method}: ${req.path}`, (errr,data)=>{
        next()

    })
    // req.myName ="Amir Ali"
    // res.end("hey")
})
app.use((req,res,next)=>{
    console.log("MiddleWare 2");
    // res.end("Amir")
    next();
})
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
    res.setHeader("X-myName", "Amir Ali")  //custom header
    //always add X in your custom header
    // console.log(req.headers)
    // console.log(req.myName)
    return res.json(users)
})

app.get("/api/users/:id", (req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=>user.id === id);
    if(!user) {
        return res.status(404).json({ status: "fail", message: "User not found" });
    }
    return res.json(user)
})

app.post("/api/users", (req,res)=>{
    const body = req.body;
    if(!body ||!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
       return res.status(400).json({msg:"fill all the field"})
    }
    // console.log("Body", body)
    users.push({...body, id: users.length+1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
        return res.status(202).json({status: "success", id: users.length})
    })
    //todo:create new user
})

app.patch("/api/users/:id", (req,res)=>{
    //todo:edit the user with id
    return res.json({status: "pending"})
})
app.delete("/api/users/:id", (req,res)=>{
   const userId = parseInt(req.params.id);

  // Step 1: Read the file
  fs.readFile("./MOCK_DATA.json", 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Could not read file" });
    }

    let users = JSON.parse(data);

    // Step 2: Check if user exists
    const userExists = users.find(user => user.id === userId);
    if (!userExists) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    // Step 3: Filter out the user
    const updatedUsers = users.filter(user => user.id !== userId);

    // Step 4: Write updated data back to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(updatedUsers, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ status: "error", message: "Failed to write file" });
      }

      res.json({ status: "success", message: `User with ID ${userId} deleted` });
    });
  });
})

app.listen(port, ()=>console.log("Server started at"+ port))
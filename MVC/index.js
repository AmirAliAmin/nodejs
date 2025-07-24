const express = require("express")
const {connectMongoDb} = require("./connection")

const {logRequestResponse} = require("./middlewares")

const userRoutes = require("./routes/users")

const app = express()
const port = 8000

//Connection
connectMongoDb('mongodb://127.0.0.1:27017/mvc').then(()=>{
    console.log("mongodb connected")
})


app.use(express.urlencoded({extended:false}))

app.use(logRequestResponse("log.txt"))


//Routes
app.use("/api/users", userRoutes)

app.listen(port, ()=>console.log("Server started at"+ port))
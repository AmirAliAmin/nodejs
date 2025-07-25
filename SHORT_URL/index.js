const express = require("express")
const UrlRoutes = require("./routes/url")
const { ConnectToMongoos } = require("./connection")

const app = express()
const PORT = 8001

ConnectToMongoos("mongodb://127.0.0.1:27017/short-url")
.then(
    console.log("connect mongodb")
)

app.use(express.json());

app.use("/url", UrlRoutes)

app.listen(PORT, ()=>console.log(`Server start successful at PORT: ${PORT}`))
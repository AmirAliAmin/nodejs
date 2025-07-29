const express = require("express");
const path = require("path")
const {connectMongoDb} = require("./connection")
const userRoutes = require('./routes/user');
const cookieParser = require("cookie-parser")
const { checkForAuthCookie } = require("./middlewares/authentication");

const app = express();
const PORT = 8000;

connectMongoDb('mongodb://127.0.0.1:27017/blogingApp').then(()=>{
    console.log("mongodb connected")
})


app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get("/",(req,res)=>{
    res.render("home",{
        user: req.user
    })
})

app.use("/user", userRoutes)
app.use(cookieParser);
app.use(checkForAuthCookie('token'))


app.listen(PORT,()=>{console.log("server started at PORT" + PORT)});
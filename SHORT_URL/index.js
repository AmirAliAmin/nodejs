const express = require("express")
const UrlRoutes = require("./routes/url")
const path = require("path")
const { ConnectToMongoos } = require("./connection")
const cookieParser = require("cookie-parser")

const {restrictTologgedUserOnly} = require("./middleware/auth")
const URL = require('./models/url');
const staticRouter = require("./routes/staticRouter")
const userRouter = require("./routes/user")

const app = express()
const PORT = 8001

ConnectToMongoos("mongodb://127.0.0.1:27017/short-url")
.then(
    console.log("connect mongodb")
)

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url",restrictTologgedUserOnly, UrlRoutes)
app.use("/", staticRouter)
app.use("/user", userRouter)

// app.get("/url/test",async(req,res)=>{
//     const allurls = await URL.find();
//     return res.render("home",{
//         urls :allurls
//     })
// })

app.get('/:shortId', async(req,res)=>{
    const shortId = req.params.shortId;
    const entry=  await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory :{
                    timestamp :Date.now(),
                },
            }

        },
        { new: true }
    ); 
    if (!entry) {
        return res.status(404).send(`<h1>Short URL not found</h1>`);
    }
    res.redirect(entry.redirectUrl)
})

app.listen(PORT, ()=>console.log(`Server start successful at PORT: ${PORT}`))
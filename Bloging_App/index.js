const express = require("express");
const path = require("path")
const {connectMongoDb} = require("./connection")
const userRoutes = require('./routes/user');
const blogRouter = require('./routes/blog');

const Blog = require("./models/blog")

const cookieParser = require("cookie-parser")
const { checkForAuthCookie } = require("./middlewares/authentication");


const app = express();
const PORT = 8000;

connectMongoDb('mongodb://127.0.0.1:27017/blogingApp')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie('token'))
app.use(express.static(path.resolve("./public")));
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/", async(req, res) => {
  const allBlogs = await Blog.find({})
  res.render("home", {
    user: req.user,
    blogs: allBlogs
  });
});

app.use("/user", userRoutes)
app.use("/blog", blogRouter)

app.listen(PORT,()=>{console.log("server started at PORT" + PORT)});
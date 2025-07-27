const express = require("express");

const { retrictTo } = require("../middleware/auth");
const URL =  require("../models/url");

const routes = express.Router();


routes.get("/admin/urls", retrictTo(['ADMIN']),async(req,res)=>{

    const allurls = await URL.find({})
    return res.render("home",{
        urls: allurls
    });
}); 


routes.get("/", retrictTo(['NORMAL','ADMIN']) ,async(req,res)=>{

    const allurls = await URL.find({createdby : req.user._id})
    return res.render("home",{
        urls: allurls
    });
});

routes.get("/signup", (req,res)=>{
    return res.render("signup")
})
routes.get("/login", (req,res)=>{
    return res.render("login")
})

module.exports = routes
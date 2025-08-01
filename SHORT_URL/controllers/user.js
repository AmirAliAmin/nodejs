const User = require("../models/user")

// const {v4: uuidv4} =require('uuid')
const {setUser,getUser} = require('../service/auth')

async function handleUserSignUp(req,res) {
    const {name,email,password} = req.body
    await User.create({
        name,
        email,
        password
    }); 
    return res.render("/")
    
}
async function handleUserlogIn(req,res) {
    const {email,password} = req.body
    const user = await User.findOne({email,password}) 
    if(!user) return res.render("login",{
        error:"invalid user Name or password"
    });
    // const sessionId = uuidv4();

    const token =setUser(user);
    res.cookie("token", token)
    return res.redirect("/")
}

module.exports ={
    handleUserSignUp,
    handleUserlogIn
}
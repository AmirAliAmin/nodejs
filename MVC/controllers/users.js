const  User = require("../models/users")

async function handleGetAllUser(req,res) {

    const allDbUsers = await User.find({})  //empty means all the users show
     return res.json(allDbUsers)
}

async function handleGetUserById(req,res) {
    const user = await User.findById(req.params.id)
    if(!user) {
        return res.status(404).json({ status: "fail", message: "User not found" });
    }
    return res.json(user)
    
}

async function handleCreateNewUser(req, res) {
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
    
}

async function handleUpadteUser(req,res) {
    const user = await User.findByIdAndUpdate(req.params.id, {last_name:"Amin"})
    return res.json({status: "success"})
    
}

async function handleDeleteById(req, res) {
    const user = await User.findByIdAndDelete(req.params.id)
    return res.json({status: "success"})
}

module.exports ={
    handleGetAllUser,
    handleGetUserById,
    handleUpadteUser,
    handleDeleteById,
    handleCreateNewUser

}
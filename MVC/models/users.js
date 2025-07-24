const mongoose = require("mongoose")

//Schema
const userSchema = new mongoose.Schema({
  first_name:{
    type : String,
    require : true,
  },
  last_name:{
    type: String,
    // require :true
  },
  email :{
    type : String,
    require: true,
    unique : true
  },
  job_title:{
    type : String,
  },
  gender :{
    type :String,
    require : true
  }
},{timestamps:true}); //this use for entity created at (time),updated at (time)

const User = mongoose.model("user", userSchema)

module.exports = User;
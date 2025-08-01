const { name } = require("ejs")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require:true,
        },
        email:{
            type:String,
            require: true,
            unique : true
        }, 
        role:{
            type: String,
            require: true,
            default :  "NORMAL"
        },
        password:{
            type : String,
            password: true
        }
    }
)

const User = mongoose.model('user', userSchema)

module.exports = User
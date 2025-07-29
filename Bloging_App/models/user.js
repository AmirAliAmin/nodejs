const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const {createHmac, randomBytes} = require("crypto");

const {createTokenForUser} = require("../services/authentication")



const userSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    salt:{
        type : String,
    },
    password :{
        type : String,
        required : true,
    },
    profileImageURL:{
        type : String,
        default: "./image/default.jpg"
    },
    role:{
        type: String,
        enum : ['USER', 'ADMIN'],
        default: 'USER',
    }
},
{timestamps:true}
);

userSchema.pre("save", function (next) {
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex")

    this.salt = salt;
    this.password = hashPassword;

    next();
})

userSchema.static('matchPasswordAndGernateToken', async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw Error('user No Found!');

    const salt = user.salt;
    const hashPassword = user.password

    const userProviderHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex")
    if (hashPassword !== userProviderHash) {
        throw Error("Incorrect password")
        
    }
    const token  = createTokenForUser(user)

    return token;

})

const User = model('User', userSchema)
module.exports = User;
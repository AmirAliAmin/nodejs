const jwt = require("jsonwebtoken")
const secret = "Amir123Ali@456"; //its a token key make sure save it that no one access it

function setUser(user) {
    const payload ={
        _id: user._id,
        email: user.email,
        role: user.role,
    }
    return jwt.sign(payload,secret)
    
}

function getUser(token){
    // sessionIdToUserMap.get(id);
    if(!token) return null
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null
    }
}

module.exports = {
    setUser,
    getUser
}
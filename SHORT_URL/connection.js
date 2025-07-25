const mongoose = require("mongoose");

async function ConnectToMongoos(url) {
    return mongoose.connect(url)
    
}

module.exports ={
    ConnectToMongoos
}
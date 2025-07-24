const fs = require("fs")


function logRequestResponse(filename){
    return (req, res , next)=>{
         console.log("MiddleWare 1");
            fs.appendFile(filename, `\n ${Date.now()}, ${req.ip} ${req.method}: ${req.path}`, (errr,data)=>{
                next()
        
            }) 
    }
}

module.exports ={
    logRequestResponse,
}
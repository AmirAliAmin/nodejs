const http = require("http");
const fs = require("fs")
const url = require("url")

const myServer = http.createServer((req,res)=>{
    // console.log("New req Rec.")
    // console.log(req) //through req. we have all the information that user send
    if(req.url === "/favicon.ico")return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} New Req Received \n`
    fs.appendFile("log.txt", log,(err, data)=>{
        // res.end("Hello from Server again")
    const myurl = url.parse(req.url,true)
    // console.log(myurl)
        switch (myurl.pathname) {
            case '/':
                if (req.method === "GET") {
                    res.end("This is Home Page") 
                }
                break;
            case '/about':
                const userName = myurl.query.myname
                const id =myurl.query.id
                res.end(`hi, ${userName} and my id is ${id}`)
                break;
            case '/contact':
                res.end("This is contact Page")
                break;   
            case '/search':
                 const search = myurl.query.search_query;
                 res.end(`your search result is ${search}`)
                 break; 
            case '/signin':
                 if (req.method === "GET") {
                    res.end("This is a signin page")
                 }else if(req.method === "POST"){
                    //DB query
                    res.end("Success")
                 }    
                 break;   
            default: 
                res.end("Found error 404")
                break;
        }
    })
});
//Port Number
myServer.listen(8000, ()=>{console.log("Server Started!")}) //listen to the port.Now we are in our local machine so all the ports are open. Port is like a door (which door we run our server).one server run only one port and if we have multiple server we can't run in the same port. so every server has different port

//if you make any change in your server you may restart your server 
//like (Hello from server) if i change (hello from server again)
//so if i restart "npm start" then second one is show otherwise on change
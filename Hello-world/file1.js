const fs = require('fs')
const os = require('os')

console.log(os.cpus().length) //through this you can check the size of your thread


console.log("1")
const result = fs.readFileSync("./contact.txt", "utf-8");
console.log(result)
console.log("2")
//so i which firstly print 1 then because this is blocking(sync) so then block the code/line
//and then that go to the thread pool slove this and reture the result 
//after the result the next line print that is 2

//defult thread size =4


console.log(3)
fs.readFile("./contact.txt", "utf-8", (result, err)=>{
    if (err) {
        console.log("Error", err)
        
    } else {
        console.log(result)
    }
})
console.log(4)

//In this case fisrt print 3 then we have a non-blocking part of code so that is Async
// so it's work in background and print the next line that is 4 and after the work is
//completed in aysnc opeartion the at the last its printed

//we should always write a code that is non blocking
// so the other user are not face the diffculites 
// so i have 12 thread so the request are 12 blocking are in the thread pool
//after 12 next 13 have to wait to complete the tasks then go in the thread pool
//that make alots of wait so 
//we should always use non-blocking code
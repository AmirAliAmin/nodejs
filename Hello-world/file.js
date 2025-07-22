//apply operation on file
const fs = require('fs')
//using this "fs" to intract with file

//create file through Sync...
// fs.writeFileSync('./test.txt', "it's Amir Ali Amin. I have done my Software Engineering")

//with write file(Async)
fs.writeFile("./test1.txt", "Hello World ,this is js", (err)=>{});

//read file
// const result = fs.readFileSync('./contact.txt', "utf-8")
// console.log(result)


//without Sync
// const result = fs.readFile('./contact.txt', "utf-8")
// console.log(result)         (error)
// so handle this

fs.readFile("./contact.txt", "utf-8", (err,result)=>{
    if(err){
        console.log("error", err)
    }
    else{
        console.log(result)
    }
})

//appendData
// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
fs.appendFileSync("./test.txt", `${Date.now()} hey there \n`);

//copy file
// fs.cpSync("./test.txt", "./copy.txt");
//delete file (unlike)
// fs.unlinkSync("./copy.txt")

//this stat Sync
console.log(fs.statSync('./test.txt'))

//even you also make directory
fs.mkdirSync("my-doc");
// fs.mkdirSync("my-doc/a/b", {recursive: true});


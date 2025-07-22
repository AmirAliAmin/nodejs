const math = require("./math")
const one = require('./one')
//we also do desturcturing like
// const {add ,sub} = require("./one")
//console.log("i am", sub(2,1))

console.log("I am",math(2,5))
console.log("number is", one.addFun(1,2) ,"and", one.sunFun(5,7))
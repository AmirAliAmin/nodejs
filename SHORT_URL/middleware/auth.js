// const { getUser } = require("../service/auth");

// async function restrictTologgedUserOnly(req,res,next) {
//     // console.log(req)
//     const userUid = req.cookies?.uid;
//     // const userUid = req.headers("Authorization");

//     if (!userUid) return res.redirect("/login")
//         // const token = userUid.split("Bearer")[1];
//     const user =getUser(userUid)   
//     if (!user) return res.redirect("/login")
      
//     req.user = user;
//     next()
// }

// // async function checkAuth(req,res,next) {

// //     const userUid = req.headers("Authorization");
// //     const token = userUid.split("Bearer")[1];

// //     const user = getUser(token);
//     //    req.user = user;
       
// //     next()
// // }

// module.exports ={
//     restrictTologgedUserOnly
// }

const { getUser } = require("../service/auth");


function CheckForAuthentication(req,res,next) {
    const tokenCookie = req.cookies?.token;
    req.user = null
    if (!tokenCookie ) return next();

    const token = tokenCookie
    const user =getUser(token) 
    
    req.user = user;
    return next()
}

function retrictTo(role =[]) {
      return function (req, res, next) {
        if (!req.user) {
            return res.redirect("/login");
        }

        if (!role.includes(req.user.role)) {
            return res.status(403).send("Unauthorized");
        }

        return next();
    };
}

// async function restrictTologgedUserOnly(req,res,next) {
//     // console.log(req)
//     const userUid = req.cookies?.uid;
//     // const userUid = req.headers("Authorization");

//     if (!userUid) return res.redirect("/login")
//         // const token = userUid.split("Bearer")[1];
//     const user =getUser(userUid)   
//     if (!user) return res.redirect("/login")
      
//     req.user = user;
//     next()
// }

// async function checkAuth(req,res,next) {

//     const userUid = req.headers("Authorization");
//     const token = userUid.split("Bearer")[1];

//     const user = getUser(token);
    //    req.user = user;
       
//     next()
// }

module.exports ={
    CheckForAuthentication,
    retrictTo
}
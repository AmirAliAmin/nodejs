const { getUser } = require("../service/auth");

async function restrictTologgedUserOnly(req,res,next) {
    // console.log(req)
    const userUid = req.cookies?.uid;
    // const userUid = req.headers("Authorization");

    if (!userUid) return res.redirect("/login")
        // const token = userUid.split("Bearer")[1];
    const user =getUser(userUid)   
    if (!user) return res.redirect("/login")
      
    req.user = user;
    next()
}

// async function checkAuth(req,res,next) {

//     const userUid = req.headers("Authorization");
//     const token = userUid.split("Bearer")[1];

//     const user = getUser(token);
    //    req.user = user;
       
//     next()
// }

module.exports ={
    restrictTologgedUserOnly
}
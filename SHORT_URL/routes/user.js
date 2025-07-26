const express = require("express");
const { handleUserSignUp, handleUserlogIn } = require("../controllers/user");

const router = express.Router();


router.post('/',handleUserSignUp)
router.post('/login',handleUserlogIn)


module.exports= router;
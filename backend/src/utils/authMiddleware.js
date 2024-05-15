const {secretKey} = require("../configuration/jwtConfig")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

async function authMiddleware(req,res,next){
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({message:"Token not provided"})
    }

    const jwtToken = token.replace("Bearer","").trim();
    
    console.log("Token:", jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, secretKey);
        // console.log("verified data",isVerified);
        const userData = await User.findOne({email:isVerified.email}).
        select({
            password:0,
        })
        console.log("userData",userData)
        req.user = userData;
        req.token = token
        req.userId = userData._id
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid Token"})
    }


    

}      

module.exports = {authMiddleware};
const jwt = require("jsonwebtoken")
const {secretKey} = require("../configuration/jwtConfig")

function generateToken(user){
    const payload = {
        id:user._id,
        email:user.email,
    }
    const expiresIn = 30 * 86400;
    return jwt.sign(payload, secretKey,{expiresIn})
}
function generateRefreshToken(user){
    const payload = {
        id:user._id,
        email:user.email,
    }
    return jwt.sign(payload, secretKey,{expiresIn: "30d"})
}

function verifyToken(token){
    return jwt.verify(token,secretKey)
}

module.exports = {generateToken, generateRefreshToken, verifyToken}
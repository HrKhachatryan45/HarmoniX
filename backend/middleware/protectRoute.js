const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protectRoute =async (req, res, next) => {
    try{
     const token = req.cookies.jwt;

        if (!token){
            return res.status(401).json({error:'No token provided'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded){
            return res.status(401).json({error:'Invalid token'})
        }
        console.log(decoded,'decoded')
        const user = await User.findById(decoded.userId).select('-password')

        if (!user){
            return  res.status(400).json({error: 'User not found'});
        }

        req.user = user

        next()

    }catch (error) {
        return res.status(500).json({error:error.message});
    }
}

module.exports = protectRoute
const  jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');

const registerUser = async (req, res) => {
    const {fullName,username,password,email,confirmPassword} = req.body;
    try {

        const user1 = await User.findOne({username})
        const user2 = await User.findOne({email})

        if (user1){
            return res.status(400).json({error: 'Username already exists'});
        }

        if (user2){
            return res.status(400).json({error: 'Email already in use'});
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({error:'Email is not valid '})
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({error:'Password is not strong enough'})
        }
        if (password !== confirmPassword){
            return res.status(400).json({error:'Passwords do not match'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const  user = await User.create({
            fullName,
            username,
            password:hashedPassword,
            email,
            profileImage:'https://cdn-icons-png.flaticon.com/512/10307/10307911.png'
        })

        if (user){
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'15d'});
            console.log(token,'token')
            res.cookie('jwt',token,{
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV !== 'development',
            })
        }
        return res.status(200).json(user)

    }catch (error) {
        return res.status(500).json({error: error.message});
    }

}

const loginUser = async (req, res) => {
    const {username,password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user){
            return res.status(400).json({error: 'Invalid username'});
        }

     const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect){
            return res.status(400).json({error: 'Incorrect password'});
        }

            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'15d'});
            console.log(token,'token');
            res.cookie('jwt',token,{
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV !== 'development',
            })

        const populatedUser = await User.findById(user._id)
            .populate('media.albums')
            .populate('media.songs');

        return res.status(200).json(populatedUser)

    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const logoutUser = async (req, res) => {
    try {
        res.status(200).json({msg:'User successfully logged out'})
    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
}
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const secure = async (req, res, next) => {
    try{
    if (req.headers.authorization) {
        //Extract Token Id
        let token = req.headers.authorization.split(' ')[1]
        //Decode Token
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        //Get User from Token Id
        req.user = await User.findById(decoded.id)
        console.log(req.id)
        next()
    } 
    if(!req.headers.authorization) {
        res.status(401).json({
            message: "No Token"
        })
        throw new Error ('No Token')

    }} catch (err) {
        console.log(err)
        res.status(400).json({
            message: "Failed to Authenticate"})
        throw new Error ('Failed to Authenticate')
        console.log(req.headers)
    }
}


module.exports = {secure}
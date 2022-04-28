const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//getAllUsers
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().select(['_id', 'firstName', 'lastName', 'isAdmin', 'isPending'])
        res.status(200).json(allUsers)
    } catch(err) {
        console.log(err)
        res.status(400)
    }
} 

//Get User via Params
const getUser = async (req, res) => {
    try {
        const selectedUser = await User.findById(req.params.id)
        if(!selectedUser) {
            res.status(400).json({
                message: "User Not Found"
            })
            throw new Error (`No User with ${req.params.id} Id`)
        }
        res.status(200).json(selectedUser)

    } catch(err) {
        console.log(err)
        res.status(400)
    }}

//Register User
const createUser = async (req, res) => {
    const {firstName, lastName, email, password, height, weight, gender } = req.body
    if (!firstName || !lastName || !email || !password ) {
        res.status(400)
        res.status(400).json({
            message: "Please Fill Mandatory Fields"
        })
            throw new Error ('Please Fill mandatory Data')
     }
    try {  
        //Check if User email previously assigned
        const checkEmail = await User.find({ email: email})
        if(checkEmail.length === 0) {
           const salt = await bcrypt.genSalt(10)
           const hashedPass = await bcrypt.hash(password, salt)
           const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPass,
            height: height,
            weight: weight,
            gender: gender
        })
        res.status(201).json({
            id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            token: generateToken(newUser._id)
        }) 
        } else {
            res.status(400).json({message: `Another User with the same email "${email}" exists`})
        }
    } catch(err) {
        console.log(err)
        res.status(400)
    }}

//Update User Data
const updateUser = async (req, res) => {
    try {
        // Check for User by Id
        const {firstName, lastName, gender, phoneNumber, location, userGroup, avatarLink, height, weight, goals, equipments, notes, limitations, progressPics, nutritionPlan, programs, warmUps, coolDowns, exercises} = req.body
        const user = await User.findById(req.params.id)
        if (!user){
            res.status(400).json({
                message: "User Not Found"
            })
            throw new Error ('User Not Found')
        }

        //Update User
        await user.updateOne({
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            phoneNumber: phoneNumber,
            location: location,
            userGroup: userGroup,
            avatarLink: avatarLink,
            height: height,
            weight: weight,
            goals: goals,
            notes: notes,
            limitations: limitations,
            equipments: equipments,
            warmUps: warmUps,
            coolDowns: coolDowns,
            exercises: exercises,
            progressPics: progressPics,
            programs: programs,
            nutritionPlan: nutritionPlan
        })
        const updatedUser = await User.findById(req.params.id)
        res.status(200).json({
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
        })
    } catch(err) {
        console.log(err)
        res.status(400)
    }
}

//Login 
const logInUser = async (req, res) => {
    try {
    //Destructure data from req.body
    const {email, password} = req.body
    //Check if Data exists
    if (!email || !password) {
        res.status(400).json({
            message: 'Please Provide mandatory Fields'
        })
    }
    //Find User and Match Password
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ 
            message: "login successful",
            user: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: generateToken(user._id),
            isAdmin: user.isAdmin,
            isPending: user.isPending
        })
    } else {
        //If Wrong Password
        res.status(400).json({
            message: "Invalid Login"
        })
        throw new Error ('Invalid Login')
    }
    } catch(err) {
        console.log(err)
        res.status(400)
    }
}

//Delete User
const deleteUser = async (req, res) => {
    try {
        //Fetch User By Id
        const removedUser = await User.findById(req.params.id)

        //Check If User does not exist
        if(!removedUser) {
            res.status(400)
            res.status(400).json({
                message: "User is Not Found"
            })
            throw new Error (`No User with ${req.params.id} Id`)
        }
        //Remove User 
        await removedUser.remove()
        res.status(200).json({
            id: req.params.id
        })

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Get Signed Used Data
const getSigned = async (req, res) =>  {
    res.json({
        message: "signed"
    })
}

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
}


module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    logInUser,
    getSigned
}


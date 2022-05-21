const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const storage = require('../multer/config')
const checkFileType = require('../multer/fileCheck')
const fs = require('fs')

//getAllUsers
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().select(['_id', 'firstName', 'lastName', 'isAdmin', 'isPending', 'createdAt', 'lastLogin', 'avatarLink']).sort([['firstName', 1]])
        res.status(200).json(allUsers)
    } catch(err) {
        console.log(err)
        res.status(400)
    }
} 
//Get User Data
const getUserData = async (req, res) => {
    try {
        const {type, id} = req.params
        const data = await User.find({id: id, type:type})
        res.status(200).json(data)
        
    } catch (error) {
        console.log(error)
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
    const {firstName, lastName, email, password, height, weight, gender, location, age, personalInfo, membership } = req.body
    if (!firstName || !lastName || !email || !password || !personalInfo) {
        res.status(400)
        res.status(400).json({
            message: "Please Fill Mandatory Fields"
        })
            throw new Error ('Please Fill mandatory Data')
     }
     const checkLength = await User.find()
   
    try {  
        //Check If No Users Registered
        if(checkLength.length === 0) {
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(password, salt) 
            const newUser = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPass,
                height: height,
                weight: weight,
                gender: gender,
                isPending: false,
                isAdmin: true,
                location: location,
                age: age,
                membership: membership,
                personalInfo: {
                    isInjured: personalInfo.isInjured,
                    injury: personalInfo.injury,
                    isOtherSport: personalInfo.isOtherSport,
                    otherSport: personalInfo.otherSport,
                    target: personalInfo.target,
                    isShootPics: personalInfo.isShootPics,
                    trainDays: personalInfo.trainDays,
                    trainPlace: personalInfo.trainPlace
                }
            })
            res.status(201).json({
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                token: generateToken(newUser._id),
                isAdmin: newUser.isAdmin,
                isPending: newUser.isPending,
                age: newUser.age,
                location: newUser.location,
                extendTime: newUser.extendTime,
                height: newUser.height,
                weight: newUser.weight,
                membership: newUser.membership,
                personalInfo: {
                    isInjured: personalInfo.isInjured,
                    injury: personalInfo.injury,
                    isOtherSport: personalInfo.isOtherSport,
                    otherSport: personalInfo.otherSport,
                    target: personalInfo.target,
                    isShootPics: personalInfo.isShootPics,
                    trainDays: personalInfo.trainDays,
                    trainPlace: personalInfo.trainPlace
                }

            }) 
         }
     
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
            gender: gender,
            location: location,
            age: age,
            membership: membership,
            personalInfo: {
                isInjured: personalInfo.isInjured,
                injury: personalInfo.injury,
                isOtherSport: personalInfo.isOtherSport,
                otherSport: personalInfo.otherSport,
                target: personalInfo.target,
                isShootPics: personalInfo.isShootPics,
                trainDays: personalInfo.trainDays,
                trainPlace: personalInfo.trainPlace
            }
        })
        res.status(201).json({
            id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            token: generateToken(newUser._id),
            isAdmin: newUser.isAdmin,
            isPending: newUser.isPending,
            membership: newUser.membership,
            personalInfo: {
                isInjured: personalInfo.isInjured,
                injury: personalInfo.injury,
                isOtherSport: personalInfo.isOtherSport,
                otherSport: personalInfo.otherSport,
                target: personalInfo.target,
                isShootPics: personalInfo.isShootPics,
                trainDays: personalInfo.trainDays,
                trainPlace: personalInfo.trainPlace
            }
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
        const {firstName, lastName, gender, age, phoneNumber, location, avatarLink, height, weight, goals, equipments, notes, limitations, progressPics, nutritionPlan, lastLogin, isPending, password, plan, extendTime} = req.body
        const user = await User.findById(req.params.id)
        if (!user){
            res.status(400).json({
                message: "User Not Found"
            })
            throw new Error ('User Not Found')
        }

        if(isPending === false || isPending === true) {
            await user.updateOne({
                isPending: isPending,
            })
        }

        //Update User
        if(firstName || lastName || gender || phoneNumber || location || avatarLink || height || weight || age) {
            await user.updateOne({
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            phoneNumber: phoneNumber,
            location: location,
            avatarLink: avatarLink,
            height: height,
            weight: weight,
            age: age,
        })
        }

        if(lastLogin) {
            await user.updateOne({
                lastLogin: lastLogin
            })
        }

        const {item} = req.body
        if(item) {
            await user.updateOne({
                $push: {
                    personalDetails: [{
                        title: item.title,
                        type: item.type,
                        description: item.description,
                        createdAt: item.createdAt
                    }]
                }
            })
        }
        if(plan) {
            await user.updateOne({
                membership: plan
            })
        }
        if(password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(password, salt)
            await user.updateOne({
                password: hashedPass
            })
        }

        if(extendTime) {
            const modTime = user.extendTime.getTime()
            await user.updateOne({
                extendTime: extendTime + modTime
            })
        }

        
        const updatedUser = await User.findById(req.params.id)
        res.status(200).json({
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            lastLogin: updatedUser.lastLogin,
            isPending: updatedUser.isPending,
            isAdmin: updatedUser.isAdmin,
            isPending: updatedUser.isPending,
            age: updatedUser.age,
            location: updatedUser.location,
            extendTime: updatedUser.extendTime,
            gender: updatedUser.gender,
            height: updatedUser.height,
            weight: updatedUser.weight,
            membership: updatedUser.membership,
            personalInfo: updatedUser.personalInfo,
            phoneNumber: updatedUser.phoneNumber,
            avatarLink: updatedUser.avatarLink,
            goals: updatedUser.goals,
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

    const user = await User.findOne({email})
    
    //Find User and Match Password
    if (user && (await bcrypt.compare(password, user.password))) {
        const dateFormat = new Date(user.extendTime)
        const milliSc = dateFormat.getTime()

        if(milliSc - Date.now() < 0 &&  user.isAdmin === false) {
            await user.updateOne({
                isPending: true
            })
        }
        res.status(200).json({ 
            message: "login successful",
            user: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: generateToken(user._id),
            isAdmin: user.isAdmin,
            isPending: user.isPending,
            id: user._id,
            avatarLink: user.avatarLink,
            goals: user.goals,
            extendTime: user.extendTime
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

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
}

//Avatar Upload
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})


const uploadAvatar = async (req, res) => {
    const user = await User.findById(req.user._id)
    const oldAvatar = user.avatarLink
    fs.unlink(`/${oldAvatar}`, ()=> console.log('success delete'))
    try {
        await user.updateOne({
            avatarLink: req.file.filename
        })
        const updatedUser = await User.findById(req.user._id)
        res.status(200).json({
            avatarLink: updatedUser.avatarLink
        })
    } catch (error) {
        console.log(error) 
    }
   
}

const uploadProgressPics = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const {files} = req
        const {id} = req.params
        const date = new Date()
        files.map(async (item)=> {
           await user.updateOne({
            $push : {
                progressPics: [{
                    name: item.filename,
                    createdAt: date,
                    cycleId: id
                }]
            }
        }) 
        })
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    logInUser,
    uploadAvatar,
    upload,
    getUserData,
    uploadProgressPics
}


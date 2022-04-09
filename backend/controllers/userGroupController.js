const UserGroup = require('../models/userGroupModel')

// Get All User Groups
const getAllUserGroups = async (req, res) => {
    try {
        const userGroups = await UserGroup.find()
        res.status(200).json(userGroups)
    } catch (err) {
        console.log(err)
    }
} 

//Get Specific User Group
const getUserGroup = async (req, res) => {
    try {
        const userGroup = await UserGroup.findById(req.params.id)
        if(!userGroup) {
            res.status(400)
            throw new Error (`No User Group with ${req.params.id} Id`)
        }
        res.status(200).json(userGroup)

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Create User Group
const createUserGroup = async (req, res) => {
    const {name} = req.body
    //Check user provided a Name
    if (!name) {
        res.status(400)
        res.status(400).json({
            message: "User Group Name is required"
        })
        throw new Error ('Please assign a Name to User Group')
    }

    try {
        //Check if User Group Name previously assigned
        const checkGroup = await UserGroup.find({name})
        if(checkGroup.length === 0) {
           const userGroup = await UserGroup.create({
            name: name,
            createdById: req.user.id
        })
        res.status(201).json(userGroup) 
        } else {
            res.status(400).json({message: `Another Group with the name "${name}" exists`})
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Update existing User Group
const updateUserGroup = async (req, res) => {
    try {
        //Fetch User Group by Id
        const updateGroup = await UserGroup.findById(req.params.id)
        if (!updateGroup){
            res.status(400).json({
                message: "User Group Not Found"
            })
            throw new Error ('User Group Not Found')
        }
        //Update User Group
        await updateGroup.updateOne(req.body)
        const updated = await UserGroup.findById(req.params.id)
        res.status(200).json(updated)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Remove User Group
const deleteUserGroup = async (req, res) => {
    try {
        //Fetch User Group By Id
        const removedUserGroup = await UserGroup.findById(req.params.id)

        //Check If Group does not exist
        if(!removedUserGroup) {
            res.status(400)
            res.status(400).json({
                message: "User Group Not Found"
            })
            throw new Error (`No User Group with ${req.params.id} Id`)
        }
        //Remove User Group
        await removedUserGroup.remove()
        res.status(200).json({
            id: req.params.id
        })

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

module.exports = {
    getAllUserGroups,
    getUserGroup,
    createUserGroup,
    updateUserGroup,
    deleteUserGroup
}


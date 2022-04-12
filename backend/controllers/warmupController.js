const WarmUp = require('../models/warmUpModel')

//Get All WarmUps
const getAllWarmups = async (req, res) => {
    try {
        const warmUp = await WarmUp.findById(req.params.id)
        if(!warmUp) {
            res.status(400)
            throw new Error (`No Warm Up with ${req.params.id} Id`)
        }
        res.status(200).json(warmUp)

    } catch (err) {
        console.log(err)
        res.status(400)
    }} 

const getWarmup = async (req, res) => {
    const {name} = req.body
    //Check user provided a Name
    if (!name) {
        res.status(400)
        res.status(400).json({
            message: "Warm Up Name is required"
        })
        throw new Error ('Please assign a Name to Warm Up')
    }

    try {
        //Check if Warm Up Name previously assigned
        const checkWarmUp = await WarmUp.find({name})
        if(checkWarmUp.length === 0) {
           const warmUp = await WarmUp.create({
            name: name,
            createdById: req.user.id
        })
        res.status(201).json(warmUp) 
        } else {
            res.status(400).json({message: `Another Warm Up with the name "${name}" exists`})
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }}


const createWarmup = async (req, res) => {
    const {name, link, instruction} = req.body
    //Check user provided a Name
    if (!name) {
        res.status(400)
        res.status(400).json({
            message: "Warm Up Name is required"
        })
        throw new Error ('Please assign a Name to Warm Up')
    }

    try {
        //Check if Warm Up Name previously assigned
        const checkWarmUp = await WarmUp.find({name})
        if(checkWarmUp.length === 0) {
           const warmUp = await WarmUp.create({
            name: name,
            createdById: req.user.id,
            link: link,
            instruction: instruction
        })
        res.status(201).json(warmUp) 
        } else {
            res.status(400).json({message: `Another Warm Up with the name "${name}" exists`})
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Update Warm Up
const updateWarmup = async (req, res) => {
    try {
        //Fetch Warm Up by Id
        const updatedWarmUp = await WarmUp.findById(req.params.id)
        if (!updatedWarmUp){
            res.status(400).json({
                message: "Warm Up Not Found"
            })
            throw new Error ('Warm Up Not Found')
        }
        //Update Warm Up
        await updatedWarmUp.updateOne(req.body)
        const updated = await WarmUp.findById(req.params.id)
        res.status(200).json(updated)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Remove Warm Up
const deleteWarmup = async (req, res) => {
    try {
        //Fetch Warm Up By Id
        const removedWarmUp = await WarmUp.findById(req.params.id)

        //Check If Warm Up does not exist
        if(!removedWarmUp) {
            res.status(400)
            res.status(400).json({
                message: "Warm Up Not Found"
            })
            throw new Error (`No Warm Up with ${req.params.id} Id`)
        }
        //Remove Warm Up
        await removedWarmUp.remove()
        res.status(200).json({
            id: req.params.id
        })

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

module.exports = {
    getAllWarmups,
    getWarmup,
    createWarmup,
    updateWarmup,
    deleteWarmup
}


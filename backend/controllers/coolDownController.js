const CoolDown = require('../models/coolDownModel')

// Get All Cool Downs
const getAllCoolDowns = async (req, res) => {
    try {
        const coolDowns = await CoolDown.find().select(['name' , 'createdById', 'createdAt', '_id']).sort([['createdAt', -1]])
        res.status(200).json(coolDowns)
    } catch (err) {
        console.log(err)
    }
} 

//Get Specific Cool Down
const getCoolDown = async (req, res) => {
    try {
        const coolDown = await CoolDown.findById(req.params.id)
        if(!coolDown) {
            res.status(400)
            throw new Error (`No Cool Down with ${req.params.id} Id`)
        }
        res.status(200).json(coolDown)

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Create Cool Down
const createCoolDown = async (req, res) => {
    const {name, link, instruction} = req.body
    //Check user provided a Name
    if (!name) {
        res.status(400)
        res.status(400).json({
            message: "Cool Down Name is required"
        })
        throw new Error ('Please assign a Name to Cool Down')
    }

    try {
        //Check if Cool Down Name previously assigned
        const checkCoolDown = await CoolDown.find({name})
        if(checkCoolDown.length === 0) {
           const coolDown = await CoolDown.create({
            name: name,
            createdById: req.user.id,
            link: link,
            instruction: instruction
        })
        res.status(201).json(coolDown) 
        } else {
            res.status(400).json({message: `Another Cool Down with the name "${name}" exists`})
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Update existing Cool Down
const updateCoolDown = async (req, res) => {
    try {
        //Fetch Cool Down by Id
        const updateCoolDown = await CoolDown.findById(req.params.id)
        if (!updateCoolDown){
            res.status(400).json({
                message: "Cool Down Not Found"
            })
            throw new Error ('Cool Down Not Found')
        }
        //Update Cool Down
        await updateCoolDown.updateOne(req.body)
        const updated = await CoolDown.findById(req.params.id)
        res.status(200).json(updated)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Remove User Group
const deleteCoolDown = async (req, res) => {
    try {
        //Fetch Cool Down By Id
        const removedCoolDown = await CoolDown.findById(req.params.id)

        //Check If Cool Down does not exist
        if(!removedCoolDown) {
            res.status(400)
            res.status(400).json({
                message: "Cool Down Not Found"
            })
            throw new Error (`No Cool Down with ${req.params.id} Id`)
        }
        //Remove Cool Down
        await removedCoolDown.remove()
        res.status(200).json({
            id: req.params.id
        })

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

module.exports = {
    getAllCoolDowns,
    getCoolDown,
    createCoolDown,
    updateCoolDown,
    deleteCoolDown
}


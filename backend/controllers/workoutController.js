const WorkOut = require('../models/workoutModel')

const workoutTypes = ['exercise', 'warmup', 'cooldown']

// Get All Items
const getAllItems = async (req, res) => {
    try {
        const {type} = req.params

        const itemsArrray = await WorkOut.find({type: type }).select(['name' , 'type', 'createdById', 'createdAt', '_id', 'assignedUsersId']).sort([['createdAt', -1]])
        res.status(200).json(itemsArrray)
    } catch (err) {
        console.log(err)
    }
} 

//Get Specific Item
const getItem = async (req, res) => {
    try {
        const {id} = req.params
        const item = await WorkOut.findById(id)
        if(!item) {
            res.status(400)
            throw new Error (`No Item with ${id} Id`)
        }
        res.status(200).json(item)

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Create Items 
const createItem = async (req, res) => {
    const {type} = req.params
    const {name, link, instruction} = req.body
        try {
            if(!workoutTypes.includes(type)) {
                console.log('Unknown Type')
                res.status(400).json({
                    message: 'unknow type'
                })
                throw new Error ('Unknown Type')
            }

        //Check user provided a Name
        else if (!name) {
                res.status(400)
                res.status(400).json({
                    message: "Item name is required"
                })
                throw new Error ('Please assign a Name to Item')
            }
        //Check if Item Name previously assigned
        const checkName = await WorkOut.find({ type: type, name: name})
        if(checkName.length === 0) {
           const item = await WorkOut.create({
            type: type,
            name: name,
            createdById: req.user.id,
            link: link,
            instruction: instruction,
            assignedUsersId: []
        })
        res.status(201).json(item) 
        } else {
            res.status(400).json({message: `Another Item with the name "${name}" exists`})
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Update existing Item
const updateItem = async (req, res) => {
    try {
        const {id} = req.params
        const {name, link, instruction, userId, isComplete, setDate} = req.body
        //Fetch Item by Id
        const modifyItem = await WorkOut.findById(id)
        if (!modifyItem){
            return res.status(400).json({
                message: "Item Not Found"
            })
        }

        //Update ttem
        if(name || link || instruction) {
        await modifyItem.updateOne({
                    name: name,
                    link: link,
                    instruction: instruction,
                })
        }

        //Assign User & Date
        if (userId || isComplete || setDate) {
            await modifyItem.updateOne({
                $push: {assignedUsersId : [{
                    userId: userId,
                    isComplete: isComplete,
                    setDate: setDate
                }]}
            })
        }
        
        const updatedItem = await WorkOut.findById(id)
        res.status(200).json(updatedItem)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Remove Item
const deleteItem = async (req, res) => {
    try {
        const {id} = req.params
        //Fetch Item By Id
        const removeItem = await WorkOut.findById(id)

        //Check If Item does not exist
        if(!removeItem) {
            res.status(400)
            res.status(400).json({
                message: "Item Not Found"
            })
            throw new Error (`Item Down with ${id} Id`)
        }
        //Remove Item
        await removeItem.remove()
        res.status(200).json({
            id: id
        })

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

module.exports = {
    getAllItems,
    createItem,
    getItem,
    deleteItem,
    updateItem
}


const Notification = require('../models/notificationModel')

// Get All Notifications
const getAllNotifications = async (req, res) => {
    try {
        const notification = await Notification.find({ToId: req.user.id})
        res.status(200).json(notification)
    } catch (err) {
        console.log(err)
    }
}

// Get Number of  Notifications
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ToId: req.user.id}).limit(10)
        res.status(200).json(notifications)
    } catch (err) {
        console.log(err)
    }
} 

//Get Specific Notification
const getNotification= async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id)
        if(!notification) {
            res.status(400)
            throw new Error (`No Notification with ${req.params.id} Id`)
        }
        res.status(200).json(notification)

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Create Notification
const createNotification = async (req, res) => {
    const {name, eventType, ToId} = req.body
    //Check user provided a Name or Event Type
    if (!name || !eventType || !ToId) {
        res.status(400)
        res.status(400).json({
            message: "Mandatory Fields Name is required"
        })
        throw new Error ('Please assign a Name or Event Type to Notification')
    }

    try {
           const notification = await Notification.create({
            name: name,
            createdById: req.user.id,
            eventType: eventType,
            ToId: ToId
        })
        res.status(201).json(notification) 
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Update existing Notification
const updateNotification = async (req, res) => {
    try {
        const {isRead} = req.body
        //Fetch Notification by Id
        const updateNotification = await Notification.findById(req.params.id)
        if (!updateNotification){
            res.status(400).json({
                message: "Notification Not Found"
            })
            throw new Error ('Notification Not Found')
        }
        //Update Notification
        await updateNotification.updateOne({
            isRead: isRead
        })
        const updated = await Notification.findById(req.params.id)
        res.status(200).json(updated)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Remove Notfication
const deleteNotification = async (req, res) => {
    try {
        //Fetch Notification By Id
        const removedNotification = await Notification.findById(req.params.id)

        //Check If Notification does not exist
        if(!removedNotification) {
            res.status(400)
            res.status(400).json({
                message: "Notification Not Found"
            })
            throw new Error (`No Notification with ${req.params.id} Id`)
        }
        //Remove Notification
        await removedNotification.remove()
        res.status(200).json({
            id: req.params.id
        })

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

module.exports = {
    getAllNotifications,
    getNotification,
    getNotifications,
    createNotification,
    updateNotification,
    deleteNotification
}


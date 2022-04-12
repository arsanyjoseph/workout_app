const Video = require('../models/videoModel')

//Get All Videos
const getAllVideos = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) {
            res.status(400)
            throw new Error (`No Video with ${req.params.id} Id`)
        }
        res.status(200).json(video)

    } catch (err) {
        console.log(err)
        res.status(400)
    }} 

//Get specific Video
const getVideo = async (req, res) => {
    try {
        // Check for Video
        const video = await Video.findById(req.params.id)
        if(!video) {
            res.status(400)
            throw new Error (`No Video with ${req.params.id} Id`)
        }
        res.status(200).json(video)

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}    

const createVideo = async (req, res) => {
    const {name, link, instruction} = req.body
    //Check user provided a Name
    if (!name) {
        res.status(400)
        res.status(400).json({
            message: "Video Name is required"
        })
        throw new Error ('Please assign a Name to Video')
    }

    try {
        //Check if Video Name previously assigned
        const checkVideo = await Video.find({name})
        if(checkVideo.length === 0) {
           const video = await Video.create({
            name: name,
            createdById: req.user.id,
            link: link,
            instruction: instruction
        })
        res.status(201).json(video) 
        } else {
            res.status(400).json({message: `Another Video with the name "${name}" exists`})
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Update Video
const updateVideo = async (req, res) => {
    try {
        //Fetch Video by Id
        const updatedVideo = await Video.findById(req.params.id)
        if (!updatedVideo){
            res.status(400).json({
                message: "Video Not Found"
            })
            throw new Error ('Video Not Found')
        }
        //Update Video 
        await updatedVideo.updateOne(req.body)
        const updated = await Video.findById(req.params.id)
        res.status(200).json(updated)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Remove Video
const deleteVideo = async (req, res) => {
    try {
        //Fetch Video By Id
        const removedVideo = await Video.findById(req.params.id)

        //Check If Video does not exist
        if(!removedVideo) {
            res.status(400)
            res.status(400).json({
                message: "Video Not Found"
            })
            throw new Error (`No Video with ${req.params.id} Id`)
        }
        //Remove Video
        await removedVideo.remove()
        res.status(200).json({
            id: req.params.id
        })

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

module.exports = {
    getAllVideos,
    getVideo,
    createVideo,
    updateVideo,
    deleteVideo
}


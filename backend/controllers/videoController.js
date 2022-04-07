const getAllVideos = (req, res) => {
    res.status(200).json({Video: "all Videos"})
} 

const getVideo = (req, res) => {
    res.status(201).json({Video: req.params.id})
}


const createVideo = (req, res) => {
    res.status(201).json({Video: "Video created"})
}

const updateVideo = (req, res) => {
    res.status(200).json({Video : req.params.id})
}

const deleteVideo = (req, res) => {
    res.status(200).json({Video : req.params.id})
}

module.exports = {
    getAllVideos,
    getVideo,
    createVideo,
    updateVideo,
    deleteVideo
}


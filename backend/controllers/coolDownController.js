const getAllCoolDowns = (req, res) => {
    res.status(200).json({coolDown: "all coolDowns"})
} 

const getCoolDown = (req, res) => {
    res.status(201).json({coolDown: req.params.id})
}


const createCoolDown = (req, res) => {
    res.status(201).json({coolDown: "coolDown created"})
}

const updateCoolDown = (req, res) => {
    res.status(200).json({coolDown : req.params.id})
}

const deleteCoolDown = (req, res) => {
    res.status(200).json({coolDown : req.params.id})
}

module.exports = {
    getAllCoolDowns,
    getCoolDown,
    createCoolDown,
    updateCoolDown,
    deleteCoolDown
}


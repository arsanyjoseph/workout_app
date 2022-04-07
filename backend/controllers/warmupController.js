const getAllWarmups = (req, res) => {
    res.status(200).json({Warmup: "all Warmups"})
} 

const getWarmup = (req, res) => {
    res.status(201).json({Warmup: req.params.id})
}


const createWarmup = (req, res) => {
    res.status(201).json({Warmup: "Warmup created"})
}

const updateWarmup = (req, res) => {
    res.status(200).json({Warmup : req.params.id})
}

const deleteWarmup = (req, res) => {
    res.status(200).json({Warmup : req.params.id})
}

module.exports = {
    getAllWarmups,
    getWarmup,
    createWarmup,
    updateWarmup,
    deleteWarmup
}


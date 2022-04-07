const getAllPrograms = (req, res) => {
    res.status(200).json({Program: "all Programs"})
} 

const getProgram = (req, res) => {
    res.status(201).json({Program: req.params.id})
}


const createProgram = (req, res) => {
    res.status(201).json({Program: "Program created"})
}

const updateProgram = (req, res) => {
    res.status(200).json({Program : req.params.id})
}

const deleteProgram = (req, res) => {
    res.status(200).json({Program : req.params.id})
}

module.exports = {
    getAllPrograms,
    getProgram,
    createProgram,
    updateProgram,
    deleteProgram
}


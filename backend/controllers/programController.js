const Program = require ('../models/programModel')

const getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find().sort([['createdAt', -1]])
        res.status(200).json(programs)
    } catch (error) {
        console.log(error)
    }
} 

const getProgram = (req, res) => {
    res.status(201).json({Program: req.params.id})
}


const createProgram = async (req, res) => {
    const {details, name} = req.body
    if(!name || name === '' || details.length === 0) {
        res.status(400).json({
            message: "Please, Fill Mandatory Fields"
        })
    }

    try {
        const checkProg = await Program.find({name: name})
        if(checkProg.length === 0) {
            const program = await Program.create({
                name: name,
                createdById: req.user.id,
                details: details
            })
            
            res.status(201).json(program)
        } else {
            res.status(400).json({
                message: "Error While Creating Program"
            })
        }
    } catch (error) {
        console.log(error)   
    }
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


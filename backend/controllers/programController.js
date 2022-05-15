const Program = require ('../models/programModel')

const getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find().sort([['createdAt', -1]])
        res.status(200).json(programs)
    } catch (error) {
        console.log(error)
    }
} 

const getProgram = async (req, res) => {
    try {
        const {id} = req.params
        const program = await Program.findById(id)
        if(!program) {
            res.status(400).json({
                message: 'No Program Found'
            })
        }
        res.status(200).json(program)
    } catch (error) {
        console.log(error)
    }
}


const createProgram = async (req, res) => {
    try {
        const {details, name} = req.body
    if(!name || name === '' || details.length === 0) {
        res.status(400).json({
            message: "Please, Fill Mandatory Fields"
        })
    }

        const checkProg = await Program.find({name: name})
        if(checkProg.length === 0) {
            const program = await Program.create({
                name: name,
                createdById: req.user.id,
                details: details
            })  
            res.status(201).json(program)
        } 
    } catch (error) {
        console.log(error)   
    }
}

const updateProgram = async (req, res) => {
   try {
       const {id} = req.params
       const {startDate, userId, prog} = req.body

       const program = await Program.findById(id)

       if (startDate && userId) {
       await program.updateOne({
           assignedUser: {
               userId: userId,
               startDate: startDate
           }
       }) 
       }

       if(prog) {
           await program.updateOne({
               details: [...program.details, ...prog]
           })
       }
       const modifyItem = await Program.findById(id)
       res.status(200).json(modifyItem)
   } catch (error) {
       console.log(error)
   }
}

const deleteProgram = async (req, res) => {
    try {
        const {id} = req.params
        const program = Program.findById(id)
        if(!program) {
            res.status(400)
            res.status(400).json({
                message: "Program is Not Found"
            })
            throw new Error (`No Program with ${req.params.id} Id`)
        }
        //Remove User 
        await program.remove()
        res.status(200).json({
            id: req.params.id
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllPrograms,
    getProgram,
    createProgram,
    updateProgram,
    deleteProgram
}


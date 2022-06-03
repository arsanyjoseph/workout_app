const Program = require ('../models/programModel')
const {eventDateHandler} = require('../utils/eventDateHandle')
const moment = require('moment')
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
       const {startDate, userId, prog, newProgram, cycleId} = req.body

       const program = await Program.findById(id)

       if (startDate && userId) {
           const startDateUTC = moment.utc(startDate)
       await program.updateOne({
           assignedUser: {
               userId: userId,
               startDate: startDateUTC
           }
       }) 
       }

       if(prog) {
           await program.updateOne({
               details: [...program.details, ...prog]
           })
       }

       if(newProgram) {
           await program.updateOne({
               details: [...newProgram.details]
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

const getProgByUser = async (req, res)=> {
    try {
        const {id} = req.params
        const {cycleId} = req.body
        const prog = await Program.findOne({'assignedUser.userId': id })
        if(prog){
        const {startDate} = prog.assignedUser
        let newArr = []
        prog.details.map((week, weekInd)=> {
            week.map((day, dayInd) => {
                day.map((cycle, cycleInd) => {
                    const indexDay = (7 * weekInd) + dayInd
                    const wu = {
                        title: cycle.warmup ? 'WarmUp' : 'Rest',
                        date: eventDateHandler(startDate, indexDay),
                        id: cycle.warmup
                    }
                    let exs = []
                    cycle.exercise.map((ex)=> {
                        const exercise = {
                            title: ex ? 'Exercise' : 'Rest',
                            date: eventDateHandler(startDate, indexDay),
                            id: ex
                        }
                        exs.push(exercise)
                    } )
                    const cd = {
                        title: cycle.cooldown ? 'CoolDown' : 'Rest',
                        date: eventDateHandler(startDate, indexDay),
                        id: cycle.cooldown
                    }
                    newArr.push(wu, ...exs, cd)
                })
            })
            return
        })
        if(cycleId) {
            const checkCycle = Program.find({'assignedUser.userId': id }, {'assignedUser.completed': cycleId})
            if(!checkCycle) {
                await prog.updateOne({
                    $push : {
                        'assignedUser.completed': [cycleId]
                    }
                })
                const newProg = await Program.findOne({'assignedUser.userId': id })
                res.status(200).json(newProg)
    
            } else {
                res.json({messgae: "Already Completed"})
            }

        } else {
            res.status(200).json(newArr)
        }}
    } catch (error) {
        console.log(error)
    }
}

const getTodayUser = async (req, res) => {
    try {
        const {id} = req.params
        const {date} = req.body
        const prog = await Program.findOne({'assignedUser.userId': id })
        if (prog) {

        const {startDate} = prog.assignedUser
        let newArr = []
        prog.details.map((week, weekInd)=> {
            week.map((day, dayInd) => {
                newArr.push(day)
            })
        })
        const dateUTC = moment.utc(date)
        const startM = moment(startDate)
        const diff = dateUTC.diff(startM, 'days')
        if(diff >= 0) {
            res.status(200).json(newArr[diff])
        } else {
            res.status(200).json({
                message: 'No program Assigned yet'
            })
        }
    }
    } catch (error) {
        console.log(error)
    }
}

const checkComplete = async (req, res) => {
    try {
        const {id} = req.params
        const checkCycleComplete = await Program.find()
        console.log(checkCycleComplete)
    } catch (error) {
      console.log(error)  
    }
}

module.exports = {
    getAllPrograms,
    getProgram,
    createProgram,
    updateProgram,
    deleteProgram,
    getProgByUser,
    getTodayUser,
    checkComplete
}


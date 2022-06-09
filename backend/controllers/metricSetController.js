const MetricSet = require('../models/metricSetsModel')
const {handleDate} = require('../utils/dateHandler')
const moment = require('moment')

const getAllMetricSets = async (req, res) => {
    try {
        const metricsSets = await MetricSet.find().sort([['createdAt', -1]])
        res.status(200).json(metricsSets)
    } catch (error) {
        console.log(error)
    }
} 

const getMetricSet = async (req, res) => {
   try {
       const {id} = req.params
       const metricSet = await MetricSet.findById(id)
       res.status(200).json(metricSet)
   } catch (error) {
       console.log(error)
   }
}


const createMetricSet = async (req, res) => {
    try {
        const {metricSet} = req.body
        const checkMetric = await MetricSet.find({name: metricSet.name})
        if(checkMetric.length === 0) {
            const createdAt = moment.utc().format()
            const newMetricSet = await MetricSet.create({
                name: metricSet.name,
                metrics: metricSet.metrics,
                createdById: req.user._id,
                createdAt: createdAt
            })
            res.status(201).json(newMetricSet)
        }
    } catch (error) {
        console.log(error)
    }
}

const updateMetricSet = async (req, res) => {
    try {
        const {metricSet, assignData, answerUpdate} = req.body
        const {id} = req.params
        if(!id) {
            res.status(400).json({
                message: "Please, Provide an Id"
            })
        }
        const oldMetricSet = await MetricSet.findById(id)
        if(!oldMetricSet) {
            res.status(400).json({
                message: "No Metric Set"
            })
        }
        if(metricSet) {
            await oldMetricSet.updateOne({
                name: metricSet.name,
                metrics: [...metricSet.metrics]
            })
        }

        if(assignData) {
            const dateUTC = moment.utc(assignData.date)
            await oldMetricSet.updateOne({
                $push : {
                  usersAssigned: [{
                    userId: assignData.userId,
                    date: dateUTC
                }]  
                }
            })
        }

        if(answerUpdate) {
           const {userAnswers} = answerUpdate
           let indAnswer
           oldMetricSet.usersAssigned.map((item, index)=> {
                if(item._id == answerUpdate._id) {
                    return indAnswer = index
                }
            })
            await MetricSet.updateOne({usersAssigned: {
                $elemMatch: {
                    _id: answerUpdate._id
                }
            } },
            { $push : {
                'usersAssigned.$.userAnswers': userAnswers
            }}
            )
        }
        const modMetricSet = await MetricSet.findById(id)
        res.status(200).json(modMetricSet)
    } catch (error) {
        console.log(error)
    }
}

const deleteMetricSet = async (req, res) => {
    try {
        const {id} = req.params
        const metricSet = await MetricSet.findById(id)
        await metricSet.remove()
        res.status(200).json({id:id})
    } catch (error) {
        console.log(error)
    }
    
}

const getUsersMS = async (req, res) => {
    try {
        const {id} = req.params
        const {date} = req.body
        const dateUTC = moment.utc(date)
        let newArr = []
        if(id) {
          const metricSets = await MetricSet.find({ usersAssigned : {
            $elemMatch: {
                userId: id,
            }
        }})
        
        metricSets.map((item)=> {
            item.usersAssigned.map((it, index)=> {
                if(moment(it.date).isSame(dateUTC, 'day') && it.userId == id) {
                    let newItem = {
                        _id: item._id,
                        name: item.name,
                        createdById: item.createdById,
                        createdAt: item.createdAt,
                        metrics: item.metrics,
                        updatedAt: item.updatedAt,
                        usersAssigned: item.usersAssigned[index]
                    }
                    newArr.push(newItem)
                }
            })
        })
        
        res.status(200).json(newArr)
    }} catch (error) {
        console.log(error)
    }
}

const getAllUserMs = async (req, res) => {
    try {
        const {id} = req.body
        if(id) {
            const metricSets = await MetricSet.find({ usersAssigned : {
              $elemMatch: {
                  userId: id,
              }
          }})
          let newMSs = []
          if(metricSets.length > 0) {
          metricSets.map((ms,index)=> {
              ms.usersAssigned.map((it, ind)=> {
                  if(it.userId == id) {
                    let newMs = {
                        createdAt: ms.createdAt,
                        createdById: ms.createdById,
                        metrics: ms.metrics,
                        name: ms.name,
                        updatedAt: ms.updatedAt,
                        _id: ms._id,
                        usersAssigned: ms.usersAssigned[ind]
                    }
                    newMSs.push(newMs)
                  }
              })
          })}
          res.status(200).json(newMSs)
        }} catch (error) {
        console.log(error)
    }
}

const getAnswers = async (req, res)=> {
    try {
       const {userId, id} = req.params
       const ms = await MetricSet.findById(id)
       const answers = ms.usersAssigned.filter((item, index)=> item.userId == userId)
       const dates = answers.map((item, index)=> item.date)
       res.status(200).json(answers)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllMetricSets,
    getMetricSet,
    createMetricSet,
    updateMetricSet,
    deleteMetricSet,
    getUsersMS,
    getAllUserMs,
    getAnswers
}


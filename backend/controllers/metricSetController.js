const MetricSet = require('../models/metricSetsModel')
const {handleDate} = require('../utils/dateHandler')

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
            const newMetricSet = await MetricSet.create({
                name: metricSet.name,
                metrics: metricSet.metrics,
                createdById: req.user._id,
                createdAt: Date.now()
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
            await oldMetricSet.updateOne({
                $push : {
                  usersAssigned: [{
                    userId: assignData.userId,
                    date: assignData.date
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
        let newArr = []
        if(id) {
          const metricSets = await MetricSet.find({ usersAssigned : {
            $elemMatch: {
                userId: id,
            }
        }})
        metricSets.map((item)=> {
            let setDate = handleDate(date)
            item.usersAssigned.map((it, index)=> {
                let itDate = handleDate(it.date)
                if(itDate === setDate) {
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
        }
        res.status(200).json(newArr)
    } catch (error) {
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
          res.status(200).json(metricSets)
        }} catch (error) {
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
    getAllUserMs
}


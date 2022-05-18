const MetricSet = require('../models/metricSetsModel')

const getAllMetricSets = async (req, res) => {
    try {
        const metricsSets = await MetricSet.find().sort([['name', 1]])
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
        const {name, metrics} = req.body
        const checkMetric = await MetricSet.find({name: name})
        if(checkMetric.length === 0) {
            const newMetricSet = await MetricSet.create({
                name: name,
                metrics: metrics,
                createdById: req.user._id,
                createdAt: Date.now()
            })
            res.status(201).json(newMetricSet)
        }
    } catch (error) {
        console.log(error)
    }
}

const updateMetricSet = (req, res) => {
    res.status(200).json({MetricSet : req.params.id})
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

module.exports = {
    getAllMetricSets,
    getMetricSet,
    createMetricSet,
    updateMetricSet,
    deleteMetricSet
}


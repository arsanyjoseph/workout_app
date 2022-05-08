const getAllMetricSets = (req, res) => {
    res.status(200).json({MetricSet: "all MetricSets"})
} 

const getMetricSet = (req, res) => {
    res.status(201).json({MetricSet: req.params.id})
}


const createMetricSet = (req, res) => {
    res.status(201).json({MetricSet: "MetricSet created"})
}

const updateMetricSet = (req, res) => {
    res.status(200).json({MetricSet : req.params.id})
}

const deleteMetricSet = (req, res) => {
    res.status(200).json({MetricSet : req.params.id})
}

module.exports = {
    getAllMetricSets,
    getMetricSet,
    createMetricSet,
    updateMetricSet,
    deleteMetricSet
}


const express = require('express');
const router = express.Router();
const {
    getAllMetricSets,
    getMetricSet,
    createMetricSet,
    updateMetricSet,
    deleteMetricSet
} = require('../controllers/metricSetController')

router.route('/').get(getAllMetricSets).post(createMetricSet)

router.route('/:id').get(getMetricSet).put(updateMetricSet).delete(deleteMetricSet)

module.exports = router
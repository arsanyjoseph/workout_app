const express = require('express');
const router = express.Router();
const {
    getAllMetricSets,
    getMetricSet,
    createMetricSet,
    updateMetricSet,
    deleteMetricSet
} = require('../controllers/metricSetController')
const {secure} = require('../middleware/authenticate')

router.get('/:id', secure, getMetricSet)
router.put('/:id', secure, updateMetricSet)
router.delete('/:id', secure, deleteMetricSet)

router.get('/', secure, getAllMetricSets)
router.post('/', secure, createMetricSet)



module.exports = router
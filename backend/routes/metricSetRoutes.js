const express = require('express');
const router = express.Router();
const {
    getAllMetricSets,
    getMetricSet,
    createMetricSet,
    updateMetricSet,
    deleteMetricSet,
    getUsersMS,
    getAllUserMs,
    getAnswers
} = require('../controllers/metricSetController')
const {secure} = require('../middleware/authenticate')

router.get('/chart/:id/:userId', secure, getAnswers)
router.post('/all/user/', secure, getAllUserMs)
router.post('/today/user/:id', secure, getUsersMS)
router.get('/:id', secure, getMetricSet)
router.put('/:id', secure, updateMetricSet)
router.delete('/:id', secure, deleteMetricSet)

router.get('/', secure, getAllMetricSets)
router.post('/', secure, createMetricSet)



module.exports = router
const express = require('express');
const router = express.Router();
const {
    getAllWarmups,
    getWarmup,
    createWarmup,
    updateWarmup,
    deleteWarmup
} = require('../controllers/warmupController')

router.route('/').get(getAllWarmups).post(createWarmup)

router.route('/:id').get(getWarmup).put(updateWarmup).delete(deleteWarmup)

module.exports = router
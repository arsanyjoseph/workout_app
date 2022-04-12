const express = require('express');
const router = express.Router();
const {
    getAllWarmups,
    getWarmup,
    createWarmup,
    updateWarmup,
    deleteWarmup
} = require('../controllers/warmupController')
const {secure} = require('../middleware/authenticate')

router.get('/:id', secure, getWarmup)
router.put('/:id', secure, updateWarmup)
router.delete('/:id', secure, deleteWarmup)

router.get('/', secure, getAllWarmups)
router.post('/', secure, createWarmup)


module.exports = router
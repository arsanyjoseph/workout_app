const express = require('express');
const router = express.Router();
const {
    createNP,
    getTodayNP,
    deleteNP,
    updateNP,
} = require('../controllers/nutritionPlanController')
const {secure} = require('../middleware/authenticate')

router.put('/:id', secure, updateNP)
router.delete('/:id', secure, deleteNP)
router.post('/today/user/:id', secure, getTodayNP)
router.post('/', secure, createNP)




module.exports = router
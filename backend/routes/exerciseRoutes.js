const express = require('express');
const router = express.Router();
const {
    getAllExercises,
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise
} = require('../controllers/exerciseController')

const {secure} = require('../middleware/authenticate')

router.get('/:id', secure, getExercise)
router.put('/:id', secure, updateExercise)
router.delete('/:id', secure, deleteExercise)

router.get('/', secure, getAllExercises)
router.post('/', secure, createExercise)

module.exports = router
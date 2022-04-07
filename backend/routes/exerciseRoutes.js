const express = require('express');
const router = express.Router();
const {
    getAllExercises,
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise
} = require('../controllers/exerciseController')


router.route('/').get(getAllExercises).post(createExercise)

router.route('/:id').get(getExercise).put(updateExercise).delete(deleteExercise)


module.exports = router
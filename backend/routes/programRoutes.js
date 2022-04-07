const express = require('express');
const router = express.Router();
const {
    getAllPrograms,
    getProgram,
    createProgram,
    updateProgram,
    deleteProgram
} = require('../controllers/programController')

router.route('/').get(getAllPrograms).post(createProgram)

router.route('/:id').get(getProgram).put(updateProgram).delete(deleteProgram)

module.exports = router
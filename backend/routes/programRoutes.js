const express = require('express');
const router = express.Router();
const {
    getAllPrograms,
    getProgram,
    createProgram,
    updateProgram,
    deleteProgram
} = require('../controllers/programController')

const {secure} = require('../middleware/authenticate')

router.get('/:id', secure, getProgram)
router.put('/:id', secure, updateProgram)
router.delete('/:id', secure, deleteProgram)

router.get('/', secure, getAllPrograms)
router.post('/', secure, createProgram)


module.exports = router
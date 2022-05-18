const express = require('express');
const router = express.Router();
const {
    getAllPrograms,
    getProgram,
    createProgram,
    updateProgram,
    deleteProgram,
    getProgByUser,
    getTodayUser
} = require('../controllers/programController')

const {secure} = require('../middleware/authenticate')

router.post('/today/user/:id', secure, getTodayUser)
router.get('/users/:id', secure, getProgByUser)
router.put('/users/:id', secure, getProgByUser)

router.get('/:id', secure, getProgram)
router.put('/:id', secure, updateProgram)
router.delete('/:id', secure, deleteProgram)

router.get('/', secure, getAllPrograms)
router.post('/', secure, createProgram)


module.exports = router
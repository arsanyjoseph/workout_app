const express = require('express');
const router = express.Router();
const {
    getAllCoolDowns,
    getCoolDown,
    createCoolDown,
    updateCoolDown,
    deleteCoolDown
} = require('../controllers/coolDownController')

const {secure} = require('../middleware/authenticate')

router.get('/:id', secure, getCoolDown)
router.put('/:id', secure, updateCoolDown)
router.delete('/:id', secure, deleteCoolDown)

router.get('/', secure, getAllCoolDowns)
router.post('/', secure, createCoolDown)

module.exports = router
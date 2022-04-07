const express = require('express');
const router = express.Router();
const {
    getAllCoolDowns,
    getCoolDown,
    createCoolDown,
    updateCoolDown,
    deleteCoolDown
} = require('../controllers/coolDownController')

router.route('/').get(getAllCoolDowns).post(createCoolDown)

router.route('/:id').get(getCoolDown).put(updateCoolDown).delete(deleteCoolDown)

module.exports = router
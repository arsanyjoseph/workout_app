const express = require('express');
const router = express.Router();
const {
    getAllItems,
    createItem,
    getItem,
    deleteItem,
    updateItem
} = require('../controllers/workoutController')

const {secure} = require('../middleware/authenticate')


router.get('/:type/:id', secure, getItem)
router.delete('/:type/:id', secure, deleteItem)
router.put('/:type/:id', secure, updateItem)

router.get('/:type', secure, getAllItems)
router.post('/:type', secure, createItem)

module.exports = router
const express = require('express');
const router = express.Router();
const {
    getAllNotifications,
    getNotification,
    getNotifications,
    updateNotification,
    createNotification,
    deleteNotification
} = require('../controllers/notificationController')

const {secure} = require('../middleware/authenticate')

router.get('/:id', secure, getNotification)
router.put('/:id', secure, updateNotification)
router.delete('/:id', secure, deleteNotification)

router.post('/news', secure, getNotifications)
router.get('/', secure, getAllNotifications)
router.post('/', secure, createNotification)

module.exports = router
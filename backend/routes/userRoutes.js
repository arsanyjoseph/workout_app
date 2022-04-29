const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    logInUser,
    uploadAvatar
} = require('../controllers/userController')

const {secure} = require('../middleware/authenticate')

router.post('/login', logInUser)
router.post('/upload', uploadAvatar)

router.get('/:id', secure, getUser)
router.put('/:id', secure, updateUser)
router.delete('/:id', secure, deleteUser)

router.get('/', secure, getAllUsers)
router.post('/', createUser)







module.exports = router
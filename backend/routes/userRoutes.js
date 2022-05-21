const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    logInUser,
    uploadAvatar,
    upload,
    getUserData,
    uploadProgressPics
} = require('../controllers/userController')

const {secure} = require('../middleware/authenticate')

router.post('/login', logInUser)
router.post('/upload',secure, upload.single('avatarImg'), uploadAvatar)
router.post('/progresspics/:id',secure, upload.array('progressPics', 2), uploadProgressPics)
router.get('/:id', secure, getUser)

router.get('/data/:id/:type', secure, getUserData)
router.put('/:id', secure, upload.single('avatarImg'), updateUser)
router.delete('/:id', secure, deleteUser)

router.get('/', secure, getAllUsers)
router.post('/', createUser)







module.exports = router
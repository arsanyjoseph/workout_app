const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    logInUser,
    getSigned
} = require('../controllers/userController')

const {secure} = require('../middleware/authenticate')

router.get('/try', secure, (req, res)=>{
    res.status(200).json({
        message: 'Hello'
    })
})

router.get('/', secure, getAllUsers)
router.post('/', createUser)

router.post('/login', logInUser)

router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)



module.exports = router
const express = require('express');
const router = express.Router();
const {
    getAllUserGroups,
    getUserGroup,
    createUserGroup,
    updateUserGroup,
    deleteUserGroup,
    getGroupsByUserId
} = require('../controllers/userGroupController')

const {secure} = require('../middleware/authenticate')

router.post('/groups', secure, getGroupsByUserId)
router.get('/:id', secure, getUserGroup)
router.put('/:id', secure, updateUserGroup)
router.delete('/:id', secure, deleteUserGroup)

router.get('/', secure, getAllUserGroups)
router.post('/', secure, createUserGroup)

module.exports = router
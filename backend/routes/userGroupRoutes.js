const express = require('express');
const router = express.Router();
const {
    getAllUserGroups,
    getUserGroup,
    createUserGroup,
    updateUserGroup,
    deleteUserGroup
} = require('../controllers/userGroupController')

const {secure} = require('../middleware/authenticate')

router.get('/', secure, getAllUserGroups)
router.post('/', secure, createUserGroup)

router.get('/:id', secure, getUserGroup)
router.put('/:id', secure, updateUserGroup)
router.delete('/:id', secure, deleteUserGroup)

module.exports = router
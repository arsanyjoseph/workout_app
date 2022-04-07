const express = require('express');
const router = express.Router();
const {
    getAllUserGroups,
    getUserGroup,
    createUserGroup,
    updateUserGroup,
    deleteUserGroup
} = require('../controllers/userGroupController')

router.route('/').get(getAllUserGroups).post(createUserGroup)

router.route('/:id').get(getUserGroup).put(updateUserGroup).delete(deleteUserGroup)

module.exports = router
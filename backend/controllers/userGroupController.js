const getAllUserGroups = (req, res) => {
    res.status(200).json({UserGroup: "all UserGroups"})
} 

const getUserGroup = (req, res) => {
    res.status(201).json({UserGroup: req.params.id})
}


const createUserGroup = (req, res) => {
    res.status(201).json({UserGroup: "UserGroup created"})
}

const updateUserGroup = (req, res) => {
    res.status(200).json({UserGroup : req.params.id})
}

const deleteUserGroup = (req, res) => {
    res.status(200).json({UserGroup : req.params.id})
}

module.exports = {
    getAllUserGroups,
    getUserGroup,
    createUserGroup,
    updateUserGroup,
    deleteUserGroup
}


const getAllUsers = (req, res) => {
    res.status(200).json({users: "all users"})
} 

const getUser = (req, res) => {
    res.status(200).json({user: req.params.id})
}


const createUser = (req, res) => {
    res.status(201).json({user: req.body.name})
}

const updateUser = (req, res) => {
    res.status(200).json({user : req.params.id})
}

const deleteUser = (req, res) => {
    res.status(200).json({user : req.params.id})
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}


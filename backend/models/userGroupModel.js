const mongoose = require('mongoose')

const userGroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdById: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        immutable: true,
        ref: 'User'
    },
    usersId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('UserGroup', userGroupSchema)
const mongoose = require('mongoose')

const WorkOutSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdById: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        immutable: true,
        ref: 'User'
    },
    link: {
        type: String,
        default: ''
    },
    instruction: {
        type: String,
        default: ''
    },
    assignedUsersId: {
        type: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            isComplete: Boolean,
            setDate: Date,
        }],
        default: []
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('WorkOut', WorkOutSchema)
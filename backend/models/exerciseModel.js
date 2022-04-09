const mongoose = require('mongoose')

const exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
    },
    link: {
        type: String,
        default: ''
    },
    instruction: {
        type: String,
        default: ''
    },
    patterns: {
        type: [String],
        default: []
    },
    planes: {
        type: [String],
        default: []
    },
    primaryMuscles: {
        type: [String],
        default: []
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Exercise', exerciseSchema)
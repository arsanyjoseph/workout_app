const mongoose = require('mongoose')

const exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdById: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    link: {
        type: String,
    },
    instruction: {
        type: String,
    },
    patterns: {
        type: String,
    },
    planes: {
        type: String,
    },
    primaryMuscles: {
        type: String,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Exercise', exerciseSchema)
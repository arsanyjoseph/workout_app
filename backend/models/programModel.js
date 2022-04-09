const mongoose = require('mongoose')

const programSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdById: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        default: ''
    },
    details: [{
        warmUp: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WarmUp'
        },
        coolDown: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CoolDown'
        },
        exercise: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise'
        },
        isRest: Boolean
    }]
}, {
    timestamps: true,
})

module.exports = mongoose.model('Program', programSchema)
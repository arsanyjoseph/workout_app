const mongoose = require('mongoose')

const coolDownSchema = mongoose.Schema({
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
    link: {
        type: String,
        default: ''
    },
    instruction: {
        type: String,
        default: ''
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('CoolDown', coolDownSchema)
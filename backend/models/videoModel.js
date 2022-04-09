const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
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
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Video', videoSchema)
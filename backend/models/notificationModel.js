const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
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
    eventType: {
        type: String,
        required: true,
        default: ''
    },
    ToId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        immutable: true,
        ref: 'User'
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Notification', notificationSchema)
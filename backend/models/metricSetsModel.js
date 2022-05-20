const mongoose = require('mongoose')

const metricSetSchema = mongoose.Schema({
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
    createdAt: {
        type: Date
    },
    metrics: {
        type: [{
            metric: {
                type: String
            },
            unit: {
                type: String
            }
        }]
    },
    usersAssigned: {
        type: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            date: {
                type: Date
            }
        }],
    },
    usersAnswers: {
        type: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            date: {
                type: Date
            },
            answers: {
                type: [{}]
            }
        }]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('MetricSet', metricSetSchema)
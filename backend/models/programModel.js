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
    details: {
        type: [[[{
            warmup: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Workout'
            },
            cooldown: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Workout'
            },
            exercise: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'Workout'
            },
            isRest: {
                type: Boolean
            },
            notes: {
                type: String
            }
        }]]]
    },
    assignedUser : {
        type: {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            startDate: {
                type: Date,
            },
            completed: {
                type: [String],
                default: []
            }
        }
    },
   
}, {
    timestamps: true,
})

module.exports = mongoose.model('Program', programSchema)
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
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            startDate: {
                type: Date
            },
            endDate: {
                type: Date
            },
            completed: {
                type: [{
                    weekInd: {
                        type: Number
                    },
                    dayInd: {
                        type: Number
                    },
                    cycleInd: {
                        type: Number
                    }
                }]
            }
        }
    },
   
}, {
    timestamps: true,
})

module.exports = mongoose.model('Program', programSchema)
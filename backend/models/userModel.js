const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        immutable: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isPending: {
        type: Boolean,
        required: true,
        default: true
    },
    extendTime: {
        type: Date,
        required: true,
        default: Date.now() + 604800000
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        default: null
    },
    location: {
        type: String,
        default: ''
    },
    avatarLink: {
        type: String,
        default: ''
    },
    lastLogin: {
        type: Date,
        required: true,
        default: Date.now()
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    membership: {
        type: String,
        required: true,
    },
    personalInfo: {
        type: {
            isInjured: {
                type: Boolean
            },
            injury: {
                type: String
            },
            trainPlace: {
                type: String
            },
            target: {
                type: String
            },
            trainDays: {
                type: Number
            },
            isOtherSport: {
                type: Boolean
            },
            otherSport: {
                type: String
            },
            isShootPics: {
                type: Boolean
            }
        },
        required: true,
    },

    personalDetails: {
        type: [{
            type: {
                type: String
            },
            title: {
                type: String
            },
            description: {
                type: String
            },
            createdAt: {
                type: Date
            }
        }],
        default: []
    },
    metricSetsId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'MetricSets',
        default: []
    },
    progressPics: {
        type: [{
            name: {
                type: String
            },
            createdAt: {
                type: Date
            },
            cycleId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Program'
            }
        }],
        default: []
    },
    nutritionPlan: {
        type: [{
            carb: {
                type: Number
            },
            fat: {
                type: Number
            },
            protein: {
                type:Number
        }}],
        default:[{
            carb: null,
            fat: null,
            protein: null
        }]
    }, 
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)
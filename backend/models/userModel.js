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
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    goals: {
        type: [String],
        default: ''
    },
    equipments: {
        type: [String],
        default: ''
    },
    notes: {
        type: [String],
        default: ''  
    },
    limitations: {
        type: [String],
        default: ''
    },
    metricSetsId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'MetricSets',
        default: []
    },
    progressPics: {
        type: [String],
        default: []
    },
    nutritionPlan: {
        type: [{
            carb: Number,
            fat: Number,
            protein: Number
        }],
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
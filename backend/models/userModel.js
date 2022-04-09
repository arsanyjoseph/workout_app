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
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        default: null
    },
    location: {
        type: String,
        default: ''
    },
    userGroup: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'UserGroup',
        default:[]
    },
    avatarLink: {
        type: String,
        default: ''
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
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
    programs: {
        type: [{
            programId: mongoose.Schema.Types.ObjectId,
            isComplete: Boolean,
            startDate: Date,
            endDate: Date
        }],
        ref: 'Program',
        default: [{}]
    },
    warmUps: {
        type: [{
            programId: mongoose.Schema.Types.ObjectId,
            isComplete: Boolean,
            startDate: Date,
            endDate: Date
        }],
        ref: 'WarmUp',
        default: [{}]
    },
    coolDowns: {
        type: [{
            programId: mongoose.Schema.Types.ObjectId,
            isComplete: Boolean,
            startDate: Date,
            endDate: Date
        }],
        ref: 'CoolDown',
        default: [{}]
    },
    exercises: {
        type: [{
            programId: mongoose.Schema.Types.ObjectId,
            isComplete: Boolean,
            startDate: Date,
            endDate: Date
        }],
        ref: 'Exercise',
        default: [{}]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)
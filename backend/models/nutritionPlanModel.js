const mongoose = require('mongoose')

const nutritionPlanSchema = mongoose.Schema({
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
    plan: {
        type: [{
            carb: {
                type: Number
            },
            fat: {
                type: Number
            },
            protein: {
                type: Number
            }
        }]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    userInputs: {
        type: [{
            carb: {
                type: Number
            },
            fat: {
                type: Number
            },
            protein: {
                type: Number
            },
            isSubmit: {
                type: Boolean,
                default: false
            }
        }],
        default: []
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('NutritionPlan', nutritionPlanSchema)
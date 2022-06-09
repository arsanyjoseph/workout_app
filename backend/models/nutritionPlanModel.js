const mongoose = require('mongoose')

const nutritionPlanSchema = mongoose.Schema({
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
    
}, {
    timestamps: true,
})

module.exports = mongoose.model('NutritionPlan', nutritionPlanSchema)
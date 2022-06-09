const NutritionPlan = require('../models/nutritionPlanModel')
const moment = require('moment')

const createNP = async (req, res) => {
    try {
        const {plan, userId} = req.body
        
        if(plan && userId) {
            const createdAt = moment.utc().format()
            const newNP =  await NutritionPlan.create({
                plan: plan,
                userId: userId,
                createdAt: createdAt,
                createdById: req.user._id
            })
            res.status(201).json(newNP)
        }
    } catch (error) {
        console.log(error)
    }
}
const getTodayNP = async (req, res) => {
    try {
        const {id} = req.params
        const plan = await NutritionPlan.findOne({userId: id})
        res.status(200).json(plan)
    } catch (error) {
        console.log(error)
    }
}

const deleteNP = async (req, res) => {
    try {
        const {id} = req.params
        const np = await NutritionPlan.findById(id)
        await np.remove()
        res.status(200).json({id:id})
    } catch (error) {
        console.log(error)
    }
    
}

const updateNP = async (req, res)=> {
    try {
        const {plan, id} = req.body
        const np = await NutritionPlan.findById(id)
        if(np) {
            await NutritionPlan.updateOne({$set: {
                'plan.$[]': []
            } })
        }
        const modPlan = await NutritionPlan.findById(id)
        res.status(200).json(modPlan)
        } catch (error) {
       console.log(error) 
    }
}
module.exports = {
    createNP,
    getTodayNP,
    deleteNP,
    updateNP,
}
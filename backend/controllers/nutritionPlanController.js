const NutritionPlan = require('../models/nutritionPlanModel')
const moment = require('moment')

const createNP = async (req, res) => {
    try {
        const {name, plan, startDate, endDate, userId} = req.body
        
        if(name && plan && startDate && endDate && userId) {
            const utcStart = moment.utc(startDate)
            const utcEnd = moment.utc(endDate)
            const createdAt = moment.utc().format()
            const newNP =  await NutritionPlan.create({
                name: name,
                plan: plan,
                startDate: utcStart,
                endDate: utcEnd,
                userId: userId,
                userInputs: plan,
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
        const {date} = req.body
        const {id} = req.params
        const dateUTC = moment.utc(date)
        let newPlans = []
        const plans = await NutritionPlan.find({userId: id})
        const resultPlans = plans.filter((item)=> {
            if(moment(dateUTC).isBetween(item.startDate, item.endDate, 'hour') || moment(dateUTC).isSame(item.startDate, 'day') || moment(dateUTC).isSame(item.endDate, 'day')) {
                const planDayInd = (moment(dateUTC).diff(moment(item.startDate), 'days'))
                let newPlan = {
                    _id: item._id,
                    name: item.name,
                    createdAt: item.createdAt,
                    createdById: item.createdById,
                    userId: item.userId,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    plan: item.plan[planDayInd], 
                    userInputs: item.userInputs[planDayInd]
                }
                newPlans.push(newPlan)
            }
        })
        res.status(200).json(newPlans)
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

const  updateNP = async (req, res)=> {
    try {
        const {id} = req.params
        const {userAnswers} = req.body
        const np = await NutritionPlan.findById(id)
        if(np) {
            const modNP = await NutritionPlan.updateOne({ userInputs: {
                $elemMatch : {
                    _id: userAnswers._id
                }
            }}, {
                $set: {
                    'userInputs.$': userAnswers
                }
            })
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
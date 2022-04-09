const Exercise = require ('../models/exerciseModel')

//Get Exercises List
const getAllExercises = async (req, res) => {
    try {
        const allExercises = await Exercise.find()
        res.status(200).json(allExercises)
    } catch (err) {
        res.status(400).json(err)
        throw new Error ('Not Found')
    }
} 

//Get one Exercise by Id
const getExercise = async (req, res) => {
    try {
        // Check for Exercise
        const exercise = await Exercise.findById(req.params.id)
        if(!exercise) {
            res.status(400)
            throw new Error (`No Exercise with ${req.params.id} Id`)
        }
        res.status(200).json(exercise)

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Create new Exercise
const createExercise = async (req, res) => {
    const {name, link, instruction, patterns, planes, primaryMuscles} = req.body
    //Check user provided a Name
    if (!name) {
        res.status(400)
        res.status(400).json({
            message: "Exercise Name is required"
        })
        throw new Error ('Please assign a Name to Exercise')
    }
    try {
        //Check if Exercise Name previously assigned
        const checkExercise = await Exercise.find({ name: name})
        if(checkExercise.length === 0) {
           const newExercise = await Exercise.create({
               name: name,
               link: link,
               instruction: instruction,
               patterns: patterns,
               planes: planes,
               primaryMuscles: primaryMuscles,
               createdById: req.user.id
           })
        res.status(201).json(newExercise) 
        } else {
            res.status(400).json({message: `Another Exercise with the name "${name}" exists`})
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Update a specific Exercise
const updateExercise = async (req, res) => {
    try {
        //Fetch Exercise by Id
        const modifyExercise = await Exercise.findById(req.params.id)
        if (!modifyExercise){
            res.status(400).json({
                message: "Exercise Not Found"
            })
            throw new Error ('Exercise Not Found')
        }
        //Update Exercise
        await modifyExercise.updateOne(req.body)
        const updated = await UserGroup.findById(req.params.id)
        res.status(200).json(updated)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

//Remove an Exercise
const deleteExercise = async (req, res) => {
    try {
        //Fetch Exercise By Id
        const removeExercise = await Exercise.findById(req.params.id)

        //Check If Exercise does not exist
        if(!removeExercise) {
            res.status(400)
            res.status(400).json({
                message: "Exercise Not Found"
            })
            throw new Error (`No Exercise with ${req.params.id} Id`)
        }
        //Remove Exercise 
        await removeExercise.remove()
        res.status(200).json({
            id: req.params.id
        })

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

module.exports = {
    getAllExercises,
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise
}


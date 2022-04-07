const getAllExercises = (req, res) => {
    res.status(200).json({exercise: "all exercises"})
} 

const getExercise = (req, res) => {
    res.status(200).json({exercise: req.params.id})
}


const createExercise = (req, res) => {
    res.status(201).json({exercise: "exercise created"})
}

const updateExercise = (req, res) => {
    res.status(200).json({exercise : req.params.id})
}

const deleteExercise = (req, res) => {
    res.status(200).json({exercise : req.params.id})
}

module.exports = {
    getAllExercises,
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise
}


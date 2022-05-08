import ComboBox from './autoComplete'
import { useState } from 'react'
import { useSelector } from 'react-redux'
//{label, data, multiple, value, handleChange, inputValue, handleInputChange}

export default function Cycle () {
    const {workouts} = useSelector((state)=> state.workouts)
    const [inputValue, setInputValue] = useState('')
    const [inputValue2, setInputValue2] = useState('')
    const [inputValue3, setInputValue3] = useState('')

    const [warmup, setWarmup] = useState(null)
    const [cooldown, setCooldown] = useState(null)
    const [exercise, setExercise] = useState([])

    const cycle = {
        warmup: warmup,
        cooldown: cooldown,
        exercise: exercise,
    }

    const handleChange = (e, newVal, setState) => {
           setState(newVal)
    }

    const handleInputChange = (e, newVal, setState) => {
        setState(newVal)
    }

    const handleChEx = (e, newVal, setState) => {
        setState([...exercise, newVal])
    }

    const handleInEx = (e, newVal, setState) => {
        setState([...exercise, [newVal]])
    }

    if(workouts) {
        return (
            <div>
                <ComboBox label="Warm Up" multiple={false} data={workouts.warmups} value={warmup} handleChange={(e, newVal, setState)=> handleChange(e, newVal, setWarmup)} inputValue={inputValue} handleInputChange={(e, newVal, setState)=> handleInputChange(e, newVal, setInputValue)} />
                <ComboBox label="Cool Down" multiple={false} data={workouts.cooldowns} value={cooldown} handleChange={(e, newVal, setState)=> handleChange(e, newVal, setCooldown)} inputValue={inputValue2} handleInputChange={(e, newVal, setState)=> handleInputChange(e, newVal, setInputValue2)} />
                <ComboBox label="Exercise" multiple={true} data={workouts.exercises} value={exercise} handleChange={(e, newVal, setState)=> handleChEx(e, newVal, setExercise)} inputValue={inputValue3} handleInputChange={(e, newVal, setState)=> handleInEx(e, newVal, setInputValue3)} />
                <button onClick={()=> console.log(cycle)}>Save</button>
            </div>
        )
    }
    if(!workouts) {
        return <h1>No Items</h1>
    }
}
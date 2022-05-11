import ComboBox from './autoComplete'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './cycle.css'
import {FaRegSave} from 'react-icons/fa'


export default function Cycle ({weekInd, dayInd, setHandleProg,cycleInd, program}) {
    const {workouts} = useSelector((state)=> state.workouts)
    const [inputValue, setInputValue] = useState('')
    const [inputValue2, setInputValue2] = useState('')
    const [inputValue3, setInputValue3] = useState('')

    const [warmup, setWarmup] = useState(null)
    const [cooldown, setCooldown] = useState(null)
    const [exercise, setExercise] = useState([])

    

    const handleChange = (e, newVal, setState) => {
           setState(newVal)
    }

    const handleInputChange = (e, newVal, setState) => {
        setState(newVal)
    }

    const handleChEx = (e, newVal, setState) => {
        setState(newVal)
    }

    const handleInEx = (e, newVal, setState) => {
        setState([...exercise, newVal])
    }

    const handleSave = (e)=> {
        e.preventDefault()
        const cycle = {
            warmup: warmup._id,
            cooldown: cooldown._id,
            exercise: exercise.map((item)=> {
                return item._id
            })
        }
        program[weekInd][dayInd][cycleInd] = cycle
        setHandleProg([...program])
        console.log(program)
    }

    useEffect(()=> {

    },[program])

    if(workouts) {
        return (
            <div className='cycleForm'>
                <ComboBox disableClearable={false} label="Warm Up" multiple={false} data={workouts.warmups} value={warmup} handleChange={(e, newVal, setState)=> handleChange(e, newVal, setWarmup)} inputValue={inputValue} handleInputChange={(e, newVal, setState)=> handleInputChange(e, newVal, setInputValue)} />
                <ComboBox disableClearable={true} label="Exercise" multiple={true} data={workouts.exercises} value={exercise} handleChange={(e, newVal, setState)=> handleChEx(e, newVal, setExercise)} inputValue={inputValue3} handleInputChange={(e, newVal, setState)=> handleInEx(e, newVal, setInputValue3)} />
                <ComboBox disableClearable={false} label="Cool Down" multiple={false} data={workouts.cooldowns} value={cooldown} handleChange={(e, newVal, setState)=> handleChange(e, newVal, setCooldown)} inputValue={inputValue2} handleInputChange={(e, newVal, setState)=> handleInputChange(e, newVal, setInputValue2)} />
                <button onClick={(e)=>handleSave(e)} className='weekBtn' style={{fontSize: 'larger', marginTop: '0.25em'}}><FaRegSave/></button>
            </div>
        )
    }
    if(!workouts) {
        return <h1>No Items</h1>
    }
}
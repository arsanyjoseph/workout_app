import ComboBox from './autoComplete'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './cycle.css'
import {FaRegSave} from 'react-icons/fa'
import {MdOutlineNotes} from 'react-icons/md'
import handleErr from '../utils/errorAlert'
import {CgMinimize} from 'react-icons/cg'


export default function Cycle ({weekInd, dayInd, setHandleProg, cycleInd, program}) {
    const {workouts} = useSelector((state)=> state.workouts)
    const [showNotes, setShowNotes] = useState(false)
    const [showCycle, setShowCycle] = useState(true)
    const [notes, setNotes] = useState('')
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [inputValue2, setInputValue2] = useState('')
    const [inputValue3, setInputValue3] = useState('')

    const [warmup, setWarmup] = useState(null)
    const [cooldown, setCooldown] = useState(null)
    const [exercise, setExercise] = useState([])

    const handleNotes = (e)=> {
        e.preventDefault()
        setNotes(e.target.value)
    }

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
        if(warmup === null || cooldown === null || exercise.length === 0) {
            handleErr(setErr)
        } else {
          const cycle = {
            warmup: warmup._id,
            cooldown: cooldown._id,
            exercise: exercise.map((item)=> {
                return item._id
            }),
            notes: notes
        }
        program[weekInd][dayInd][cycleInd] = cycle
        setHandleProg([...program])
        setSuccess(true)  
        }
        
    }

    useEffect(()=> {

    },[program])

    if(workouts) {
        return (
            <div className='cycleForm'>
                <button className='weekBtn' style={{ float: 'right', fontSize: 'large'}} onClick={()=> setShowCycle(!showCycle)}><CgMinimize/></button>
                {showCycle && <>
                <ComboBox disableClearable={false} label="Warm Up" size='small' getOptionLabel={(option)=> option.name} isOptionEqualToValue={(option, value)=> option.name === value.name} multiple={false} data={workouts.warmups} value={warmup} handleChange={(e, newVal, setState)=> handleChange(e, newVal, setWarmup)} inputValue={inputValue} handleInputChange={(e, newVal, setState)=> handleInputChange(e, newVal, setInputValue)} />
                <ComboBox disableClearable={true} label="Exercise" size='small' getOptionLabel={(option)=> option.name} isOptionEqualToValue={(option, value)=> option.name === value.name} multiple={true} data={workouts.exercises} value={exercise} handleChange={(e, newVal, setState)=> handleChEx(e, newVal, setExercise)} inputValue={inputValue3} handleInputChange={(e, newVal, setState)=> handleInEx(e, newVal, setInputValue3)} />
                <ComboBox disableClearable={false} label="Cool Down" size='small' getOptionLabel={(option)=> option.name} isOptionEqualToValue={(option, value)=> option.name === value.name} multiple={false} data={workouts.cooldowns} value={cooldown} handleChange={(e, newVal, setState)=> handleChange(e, newVal, setCooldown)} inputValue={inputValue2} handleInputChange={(e, newVal, setState)=> handleInputChange(e, newVal, setInputValue2)} />
                <button className='weekBtn' onClick={()=> setShowNotes(!showNotes)}><MdOutlineNotes/></button>
                <br/>        
                {showNotes && 
                    <form>
                    <textarea value={notes} className='cycleNotes' type='text' placeholder='Notes' onChange={handleNotes}/>
                    </form>
                } 
                {success && <h5>Saved!</h5>}
                {err && <div className='errMessage' style={{fontSize: 'medium'}}>Fill All Fields</div>}
                <button onClick={(e)=>handleSave(e)} className='weekBtn' style={{fontSize: 'larger', marginTop: '0.25em'}}><FaRegSave/></button></>}
            </div>
        )
    }
    if(!workouts) {
        return <h1>No Items</h1>
    }
}
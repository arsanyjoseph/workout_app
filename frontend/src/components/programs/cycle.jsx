import ComboBox from './autoComplete'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './cycle.css'
import {MdOutlineNotes} from 'react-icons/md'
import handleErr from '../utils/errorAlert'
import {CgMinimize} from 'react-icons/cg'
import {FaCopy, FaPaste,FaRegSave } from 'react-icons/fa'
import {FiBatteryCharging} from 'react-icons/fi'
import { copyProgram, reset } from '../../features/progCopy/progCopy'


export default function Cycle ({weekInd, dayInd, setHandleProg, cycleInd, program}) {
    const dispatch = useDispatch()
    const {workouts} = useSelector((state)=> state.workouts)
    const {progCopy, isSuccess} = useSelector((state)=> state.progCopy)
    const [showNotes, setShowNotes] = useState(false)
    const [showCycle, setShowCycle] = useState(true)
    const [notes, setNotes] = useState({
        wu: '',
        cd: '',
        ex: ''
    })
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [inputValue2, setInputValue2] = useState('')

    const [inputValue3, setInputValue3] = useState('')
    const [isRest, setIsRest] = useState(true)
    const [isCopy, setIsCopy] = useState(false)

    const [warmup, setWarmup] = useState(null)
    const [cooldown, setCooldown] = useState(null)
    const [exercise, setExercise] = useState([])

    const handleRest = ()=> {
        setIsRest(!isRest)
    }
    const handleNotes = (e)=> {
        e.preventDefault()
        setNotes((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
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
        setState(newVal)
    }

    const handleSave = (e)=> {
        e.preventDefault()
        let newCycle = program[weekInd][dayInd].map((item, index)=> index == cycleInd && {...item,
            notes: notes
        })
        program[weekInd][dayInd] = newCycle
        setHandleProg([...program])        
    }

    const handleCopy = ()=> {
        const cycle = {
            isRest: isRest,
            warmup: warmup,
            cooldown: cooldown,
            exercise: exercise.map((item)=> {
                return item
            }),
            notes: notes
        }
        dispatch(copyProgram(cycle))
        dispatch(reset())
    }

    const handlePaste = ()=> {
        setIsRest(progCopy.isRest)
        setNotes(progCopy.notes)
        setShowNotes(true)
        setWarmup(progCopy.warmup)
        setCooldown(progCopy.cooldown)
        setExercise(progCopy.exercise)
    }
    useEffect(()=> {
        if(warmup && cooldown && exercise.length > 0) {
            let newCycle = program[weekInd][dayInd].map((item, index)=> index === cycleInd ? {...item,
                warmup: warmup._id,
                cooldown: cooldown._id,
                exercise: exercise.map((item)=> {
                    return item._id
                }),
                notes: notes,
                isRest: isRest,
            } : item)
            program[weekInd][dayInd] = newCycle
            setHandleProg([...program])
            setSuccess(true)
        }
        if(progCopy && isSuccess) {
            setIsCopy(true)
        }

    },[warmup, cooldown, exercise, progCopy, isCopy])

    if(workouts) {
        return (
            <div className='cycleForm'>
                <button className='weekBtn' style={{ float: 'right', fontSize: 'large'}} onClick={()=> setShowCycle(!showCycle)}><CgMinimize/></button>
                <button className='weekBtn' onClick={handleRest}><FiBatteryCharging style={{pointerEvents: 'none'}}/></button>
                {(showCycle && !isRest) && <>
                <div style={{ margin: '0.1em 0.2em'}}>
                    <span className='weekBtn' style={{fontSize: 'medium'}} onClick={handleCopy}> copy <FaCopy /></span>
                    <br/>
                     {isCopy && <span className='weekBtn' style={{fontSize: 'medium'}} onClick={handlePaste}> paste <FaPaste /></span>}
                </div>
                <ComboBox disableClearable={false} label="Warm Up" size='small' getOptionLabel={(option)=> option.name} isOptionEqualToValue={(option, value)=> option.name === value.name} multiple={false} data={workouts.warmups} value={warmup} handleChange={(e, newVal, setState)=> handleChange(e, newVal, setWarmup)} inputValue={inputValue} handleInputChange={(e, newVal, setState)=> handleInputChange(e, newVal, setInputValue)} />

                <ComboBox disableClearable={true} label="Exercise" size='small' getOptionLabel={(option)=> option.name} isOptionEqualToValue={(option, value)=> option.name === value.name} multiple={true} data={workouts.exercises} value={exercise} handleChange={(e, newVal, setState)=> handleChEx(e, newVal, setExercise)} inputValue={inputValue3} handleInputChange={(e, newVal, setState)=> handleInEx(e, newVal, setInputValue3)} />

                <ComboBox disableClearable={false} label="Cool Down" size='small' getOptionLabel={(option)=> option.name} isOptionEqualToValue={(option, value)=> option.name === value.name} multiple={false} data={workouts.cooldowns} value={cooldown} handleChange={(e, newVal, setState)=> handleChange(e, newVal, setCooldown)} inputValue={inputValue2} handleInputChange={(e, newVal, setState)=> handleInputChange(e, newVal, setInputValue2)} />
                <button className='weekBtn' onClick={()=> setShowNotes(!showNotes)}><MdOutlineNotes/></button>
                <br/>        
                {showNotes && 
                    <form>
                      <textarea value={notes.wu} className='cycleNotes' type='text' placeholder='WarmUp Note' name='wu' onChange={handleNotes}/>
                      <textarea value={notes.ex} className='cycleNotes' type='text' placeholder='Exercise Note' name='ex' onChange={handleNotes}/>
                      <textarea value={notes.cd} className='cycleNotes' type='text' placeholder='CoolDown Note' name='cd' onChange={handleNotes}/>
                      <button onClick={(e)=>handleSave(e)} className='weekBtn' style={{fontSize: 'larger', marginTop: '0.25em'}}><FaRegSave/></button>
                    </form>
                } 
                {success && <h5>Saved!</h5>}
                {err && <div className='errMessage' style={{fontSize: 'medium'}}>Fill All Fields</div>}
                </>}
                {isRest && <h5>Rest</h5>}
            </div>
        )
    }
    if(!workouts) {
        return <h1>No Items</h1>
    }
}
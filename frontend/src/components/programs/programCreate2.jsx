import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './programCreate.css'
import {IoMdAddCircleOutline} from 'react-icons/io' 
import {MdOutlineDeleteSweep} from 'react-icons/md'
import {AiOutlineSchedule} from 'react-icons/ai'
import CircularIndeterminate from '../spinner'
import Cycle from './cycle'
import {IoMdRemoveCircleOutline} from 'react-icons/io'
import {FiBatteryCharging} from 'react-icons/fi'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import handleErr from '../utils/errorAlert'


export default function ProgCreate () {
    const navigate = useNavigate()
    const [err, setErr] = useState(false)
    const {workouts} = useSelector((state)=> state.workouts)
    const {user} = useSelector((state)=> state.auth)
    const [value, setValue] = useState(null)
    const [inputValue, setInputValue] = useState('');
    const [progName, setProgName] = useState('')
    const url = '/api/programs/'
    const handleProgName = (e)=> {
        e.preventDefault()
        setProgName(e.target.value)
    }
    const handleChange = (e, newValue, index)=> {
            setValue(newValue);
    }

    const handleInputChange = (e, newValue)=> {
        setInputValue(newValue)
    }
    const cycle = {
        warmup: '',
        cooldown: '',
        exercise: [],
        isRest: false,
        notes: ''
    }
    const day = [cycle]
    const week = [day, day, day, day, day, day, day]

    const [prog, setProg] = useState([
        week,
    ])

    const addWeekEvent = (e)=> {
        e.preventDefault()
        setProg([...prog, week])
    }

    const removeWeekEvent = (e)=> {
        e.preventDefault()
        const newProg = prog.splice(1-prog.length)
        setProg(newProg)
    }

    const saveProg = (e)=> {
        e.preventDefault()
        if(!progName || progName.length === 0 || prog.length === 0) {
            handleErr(setErr)
        } else {
            const progData = {
                name: progName,
                details: prog
            }
            asyncFunc.createItem(url ,progData, user.token)
            navigate('/dashboard/programs')
        }
    }

    useEffect(()=> {
        console.log(prog)
    },[prog])
    if(prog && prog.length > 0) {
      return (
        <div className="newCoolDownContainer progCreate">
            <h1>New Program</h1>
            <form>
                <input className='progName' type='text' placeholder='Program Name' value={progName} onChange={handleProgName}/>
            </form>
            <div className='progController'>
                <button className='weekBtn' onClick={addWeekEvent}><IoMdAddCircleOutline/></button>
                <button className='weekBtn' onClick={removeWeekEvent}><MdOutlineDeleteSweep/></button>
            </div>
            {prog.map((item, index)=> <GenerateWeek cycle={cycle} setHandleProg={setProg} program={prog} key={index} days={prog[index]} count={index} data={workouts.cooldowns}  value={value} handleChange={(e, val, ind)=>handleChange(e, val, index)} inputValue={inputValue} handleInputChange={handleInputChange} />)}
            <button className='weekBtn' style={{ width: '100%', fontWeight: 'bolder'}} onClick={saveProg}><AiOutlineSchedule/> Save</button>
            {err && <div className='errMessage' >Please, Fill Mandatory Fields</div>}
        </div>
        )  
    }
    
}

export function GenerateWeek ({numberWeeks, days, cycle, count, data, value, handleChange, inputValue, handleInputChange, setHandleProg, program}) { 
    if(days && days.length > 0) {
        console.log(count)
      return (
            <div className='weekContainer'>
                {numberWeeks ? <h3>Week {`${count +1 + numberWeeks}`}</h3> : <h3>Week {`${count +1}`}</h3> }
                <div className='daysContainer'>
                  {days.map((item, index)=> <GenerateDays cycle={cycle} setHandleProg={setHandleProg} program={program} weekInd={count} dayInd={index} key={index} dayCount={(7 * count) + index +1} data={data} value={value} handleChange={handleChange} inputValue={inputValue} handleInputChange={handleInputChange} />)}  
                </div>
            </div>
        )  
    }

    if(!days || days.length === 0) {
        return (
            <CircularIndeterminate />
        )
    }
        
}

export function GenerateDays ({dayCount, setHandleProg, program, weekInd, dayInd, cycle}) {
    const handleAddCycle = (e)=> {
        e.preventDefault()
        program[weekInd][dayInd] = [...program[weekInd][dayInd], cycle]
        setHandleProg([...program])
    }

    const handleRemoveCycle = (e)=> {
        e.preventDefault()
        if(program[weekInd][dayInd].length > 1) {
            program[weekInd][dayInd] = program[weekInd][dayInd].splice(1-program[weekInd][dayInd].length) 
            setHandleProg([...program])
        }
    }

    const handleRest = (e, i)=> {
        e.preventDefault()
        let newCycle = program[weekInd][dayInd].map((item, index)=> index == parseInt(e.target.value) ? {...item,
            isRest: !item.isRest,
            warmup: null,
            cooldown: null,
            exercise: [],
        }: item)
        program[weekInd][dayInd] = newCycle
        setHandleProg([...program])
    }

    return (
        <div className='dayCont'>
            <h4>Day {dayCount}</h4>
            {program[weekInd][dayInd].map((item, index)=> <div key={index} >
                <button className='weekBtn' value={index} onClick={(e, i)=> handleRest(e, index)}><FiBatteryCharging style={{pointerEvents: 'none'}}/></button>

                {program[weekInd][dayInd][index].isRest ? <h2> </h2> : 
                <Cycle cycleInd={index} setHandleProg={setHandleProg} program={program} weekInd={weekInd} dayInd={dayInd} />} 
                </div>)} 
            <div className='add-removeBtn'>
                <button onClick={(e)=>handleRemoveCycle(e)}><IoMdRemoveCircleOutline/></button>
                <button onClick={(e)=>handleAddCycle(e)}><IoMdAddCircleOutline/></button>
            </div>
         </div>
    )
}

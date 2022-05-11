import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './programCreate.css'
import {IoMdAddCircleOutline} from 'react-icons/io' 
import {MdOutlineDeleteSweep} from 'react-icons/md'
import CircularIndeterminate from '../spinner'
import Cycle from './cycle'
import {IoMdRemoveCircleOutline} from 'react-icons/io'
import {FiBatteryCharging} from 'react-icons/fi'


export default function ProgCreate () {
    const {workouts} = useSelector((state)=> state.workouts)
    const [value, setValue] = useState(null)
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e, newValue, index)=> {
        console.log(newValue['_id'])
        console.log(index)
            setValue(newValue);
    }

    const handleInputChange = (e, newValue)=> {
        setInputValue(newValue)
    }
    const cycle = {
        warmup: '',
        cooldown: '',
        exercise: [],
        isRest: false
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

    useEffect(()=> {
        
    },[prog])
    if(prog && prog.length > 0) {
      return (
        <div className="newCoolDownContainer progCreate">
            <h1>New Program</h1>
            <div className='progController'>
                <button className='weekBtn' onClick={addWeekEvent}><IoMdAddCircleOutline/></button>
                <button className='weekBtn' onClick={removeWeekEvent}><MdOutlineDeleteSweep/></button>
            </div>
            {prog.map((item, index)=> <GenerateWeek cycle={cycle} setHandleProg={setProg} program={prog} key={index} days={prog[index]} count={index} data={workouts.cooldowns}  value={value} handleChange={(e, val, ind)=>handleChange(e, val, index)} inputValue={inputValue} handleInputChange={handleInputChange} />)}
        </div>
        )  
    }
    
}

function GenerateWeek ({days,cycle, count, data, value, handleChange, inputValue, handleInputChange, setHandleProg, program}) { 
    
    if(days && days.length > 0) {
      return (
            <div className='weekContainer'>
                <h3>Week {count +1}</h3>
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

function GenerateDays ({dayCount, setHandleProg, program, weekInd, dayInd, cycle}) {
    const handleAddCycle = (e)=> {
        e.preventDefault()
        console.log(weekInd)
        console.log(dayInd)
        program[weekInd][dayInd] = [...program[weekInd][dayInd], cycle]
        setHandleProg([...program])
        console.log(program)
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
            warmup: '',
            cooldown: '',
            exercise: [],
        }: item)
        program[weekInd][dayInd] = newCycle
        setHandleProg([...program])
        console.log(program)
    }
    return (
        <div className='dayCont'>
            <h4>Day {dayCount}</h4>
            {program[weekInd][dayInd].map((item, index)=> <div key={index} >
                <button className='weekBtn' value={index} onClick={(e, i)=> handleRest(e, index)}><FiBatteryCharging style={{pointerEvents: 'none'}}/></button>

                {program[weekInd][dayInd][index].isRest ? <h2></h2> : 
                <Cycle cycleInd={index} setHandleProg={setHandleProg} program={program} weekInd={weekInd} dayInd={dayInd} />} 
                </div>)} 
            <div className='add-removeBtn'>
                <button onClick={(e)=>handleRemoveCycle(e)}><IoMdRemoveCircleOutline/></button>
                <button onClick={(e)=>handleAddCycle(e)}><IoMdAddCircleOutline/></button>
            </div>
         </div>
    )
}

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './programCreate.css'
import {IoMdAddCircleOutline} from 'react-icons/io' 
import {MdOutlineDeleteSweep} from 'react-icons/md'
import CircularIndeterminate from '../spinner'
import ComboBox from './autoComplete'

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
   
    const day = {
        warmUp: {
            id: '',
            notes: ''
        },
        exercise: [
            {id: '', note: ''}
        ],
        coolDown: {
            id: '',
            notes: ''
        },
        isRest: false
    }
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

    if(prog && prog.length > 0) {
      return (
        <div className="newCoolDownContainer progCreate">
            <h1>New Program</h1>
            <div className='progController'>
                <button className='weekBtn' onClick={addWeekEvent}><IoMdAddCircleOutline/></button>
                <button className='weekBtn' onClick={removeWeekEvent}><MdOutlineDeleteSweep/></button>
            </div>
            {prog.map((item, index)=> <GenerateWeek key={index} days={prog[index]} count={index} data={workouts.cooldowns}  value={value} handleChange={(e, val, ind)=>handleChange(e, val, index)} inputValue={inputValue} handleInputChange={handleInputChange} />)}
        </div>
        )  
    }
    
}

function GenerateWeek ({days, count, data, value, handleChange, inputValue, handleInputChange}) { 
    
    if(days && days.length > 0) {
      return (
            <div className='weekContainer'>
                <h3>Week {count +1}</h3>
                <div className='daysContainer'>
                  {days.map((item, index)=> <GenerateDays key={index} dayCount={(7 * count) + index +1} data={data} value={value} handleChange={handleChange} inputValue={inputValue} handleInputChange={handleInputChange} />)}  
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

function GenerateDays ({dayCount, data, value, handleChange, inputValue, handleInputChange}) {
    return (
        <div className='dayCont'>
            <h6>Day {dayCount}</h6>
            <ComboBox label='Cooldown' multiple={false} data={data} value={value} handleChange={handleChange} inputValue={inputValue} handleInputChange={handleInputChange}  />
            <ComboBox data={data} label='Cooldown' multiple={false} value={value} handleChange={handleChange} inputValue={inputValue} handleInputChange={handleInputChange}  />
        </div>
    )
}

function Cycle (value, inputValue, handleInputChange, handleChange, data) {
    return (
        <div>
            <ComboBox data={data} label='Cooldown' multiple={false} value={value} handleChange={handleChange} inputValue={inputValue} handleInputChange={handleInputChange}  />
        </div>
    )
}
/*
function GenerateDays (exercises, warmups, isRest, cooldowns) {
    
    if(warmups && isRest && cooldowns && exercises) {
        return (
            <div className='dayContainer'>
                <form className="daysForm" >
                    <span className="dayLabel">Day 1: </span>
                    {isRest ? <span>Rest Day</span> : 
                    <>
                    <select id="warmup" className="selectWorkouts">
                        <option disabled selected>Warm Ups</option>
                        {warmups.map((item, index)=> <option>{item.name}</option>)}
                    </select>
                    <select className="selectWorkouts">
                        <option disabled selected>Exercises</option>    
                        {exercises.map((item, index)=> <option>{item.name}</option>)}
                    </select>
                    <select id="cooldown" className="selectWorkouts">
                    <option disabled selected>Cool Downs</option>    
                        {cooldowns.map((item, index)=> <option>{item.name}</option>)}
                    </select>
                    </>
                    }
                    <button className="submitBtn smallBtn" >isRest</button>
                </form>
            </div>
        )
    }
    prog = [week, week]
    week = [day, day]
    day = [cycle, cycle]
    cycle = {
                wu: {
                    id: '',
                    note: ''
                }
                cd: {
                    id: '',
                    note: ''
                }
                exer: [{
                    id: '',
                    note: '',
                }]
            }
    
}*/
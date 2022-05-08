import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import './programCreate.css'
import { useNavigate } from "react-router-dom"

export default function ProgramCreate () {
    const {user} = useSelector((state)=> state.auth)
    const {workouts} = useSelector((state)=> state.workouts)
    const navigate = useNavigate()
    const [days, setDays] = useState([{
        warmUp: null,
        coolDown: null,
        exercise: null,
        isRest: false        
    }])
    const [name, setName] = useState('')
    const url = '/api/programs/'
    const [err, setErr] = useState(false)
    //HandleChange
    const handleCooldown = (i, e) => {
        e.preventDefault()
        days[i].coolDown = e.target.value
        setDays([...days])
    }
    const handleExercise = (i, e) => {
        e.preventDefault()
        days[i].exercise = e.target.value
        setDays([...days])
    }
    const handleWarmup = (i, e) => {
        e.preventDefault()
        days[i].warmUp = e.target.value
        setDays([...days])
    }

    const changeName = (e)=> {
        e.preventDefault()
        setName(e.target.value)
    }
    //Set Rest Day
    const handleRest = (e)=> {
        e.preventDefault()
        let newDays = days.map((item,index)=> index == parseInt(e.target.value)? {...item,
             isRest: !item.isRest,
             warmUp: null,
            coolDown: null,
            exercise: null,
            } : item)
        setDays(newDays)
}
    //Add Extra Day
    const handleAdd = (e)=> {
        e.preventDefault()
        setDays([...days, {
            warmUp: null,
            coolDown: null,
            exercise: null,
            isRest: false        
        }])
        
    }
    //SubmitForm
    const submitProg = (e)=> {
        e.preventDefault()
        if(name === '') {
            console.log('Please Add a Program name')
        } else {
          const formData = {
            name: name,
            details: days
        } 
        asyncFunc.createItem(url, formData, user.token)
        }
    }

    useEffect(()=> {
    },[navigate])
    return (
        <div className="newCoolDownContainer" style={{width: '90%'}}>
            <div className="formHead">New Program</div>
            <div className="formBody" style={{padding: '1em'}}>
            <form className="formCoolDown" >
                    <input type='text' value={name} name="name" placeholder='* Name' onChange={changeName}/>
            </form>
            {days.map((item, index)=> <GenerateForm name={index} key={index} value={index} warmups={workouts.warmups} cooldowns={workouts.cooldowns} exercises={workouts.exercises} number={index + 1} handleRest={(e)=>handleRest(e)} isRest={item.isRest} handleCooldown={(e)=>handleCooldown(index,e)} handleExercise={(e)=> handleExercise(index,e)} handleWarmup={(e)=> handleWarmup(index, e)} /> )}

            <button className="submitBtn" onClick={(e)=> handleAdd(e)}>Add Day</button>
            <div id="cont"></div>
            <div style={{width: '100%'}} className="buttons">
                <button className='submitBtn' onClick={()=> navigate('/dashboard/programs/')}>Back</button> 
                <button className='submitBtn' onClick={(e)=> submitProg(e)}>Create</button>
            </div>
            </div>
            {err && <div className='errMessage' >Please, Fill Mandatory Fields</div>}
        </div>
    )
}

function GenerateForm ({warmups, exercises, cooldowns, number, name, handleWarmup, handleExercise, isRest, handleRest, value, handleCooldown}) {
    return (
        <div className='daysContainer'>
            <form className="daysForm" >
                <span className="dayLabel">Day {number} : </span>
                {isRest ? <span>Rest Day</span> : 
                <>
                <select id="warmup" className="selectWorkouts" onChange={handleWarmup}>
                    <option disabled selected>Warm Ups</option>
                    {warmups.map((item, index)=> <option name={name} key={item._id+ number} value={item._id}>{item.name}</option>)}
                </select>
                <select className="selectWorkouts" onChange={handleExercise}>
                    <option disabled selected>Exercises</option>    
                    {exercises.map((item, index)=> <option name={name} key={item._id+ number} value={item._id}>{item.name}</option>)}
                </select>
                <select id="cooldown" className="selectWorkouts" onChange={handleCooldown}>
                <option disabled selected>Cool Downs</option>    
                    {cooldowns.map((item, index)=> <option name={name} key={item._id+ number} value={item._id}>{item.name}</option>)}
                </select>
                </>
                }
                <button className="submitBtn restBtn" value={value} onClick={(e)=>handleRest(e)}>isRest</button>
            </form>
        </div>
    )
}
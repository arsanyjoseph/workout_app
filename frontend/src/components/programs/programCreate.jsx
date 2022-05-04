import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import './programCreate.css'

export default function ProgramCreate () {
    const {user} = useSelector((state)=> state.auth)
    const [days, setDays] = useState([{
        warmUp: '',
        coolDown: '',
        exercise: '',
        isRest: false        
    }])


    const [err, setErr] = useState(false)
    const [cooldowns, setCooldowns] = useState([])
    const [exercises, setExercises] = useState([])
    const [warmups, setWarmups] = useState([])

    const handleSelect = (e) => {
        e.preventDefault(e)
        const index = Number(e.target.name)
        const val = e.target.value
    }

    const handleRest = (e)=> {
        e.preventDefault()
    let newDays = days.map((item,index)=> index == parseInt(e.target.value)? {...item, isRest: !item.isRest} : item)
    setDays(newDays)
}
    const handleAdd = (e)=> {
        e.preventDefault()
        setDays([...days, {
            warmUp: '',
            coolDown: '',
            exercise: '',
            isRest: false        
        }])
        
    }

    useEffect(()=> {
        asyncFunc.getItems('/api/workouts/cooldown', user.token, setCooldowns)
        asyncFunc.getItems('/api/workouts/exercise', user.token, setExercises)
        asyncFunc.getItems('/api/workouts/warmup', user.token, setWarmups)
        console.log(days)
    },[days])
    return (
        <div className="newCoolDownContainer" style={{width: '90%'}}>
            <div className="formHead">New Program</div>
            <div className="formBody">
            <form className="formCoolDown" >
                    <input type='text' name="name" placeholder='* Name' />
            </form>
            {days.map((item, index)=> <GenerateForm name={index} key={index} value={index} warmups={warmups} cooldowns={cooldowns} exercises={exercises} number={index + 1} handleRest={(e)=>handleRest(e)} isRest={item.isRest} handleSelect={handleSelect} /> )}

            <button className="submitBtn" onClick={(e)=> handleAdd(e)}>Add Day</button>
            <div id="cont"></div>
            <div className="buttons">
                <button className='submitBtn'>Back</button> 
                <button className='submitBtn'>Create</button>
            </div>
            </div>
            {err && <div className='errMessage' >Please, Fill Mandatory Fields</div>}
        </div>
    )
}

function GenerateForm ({warmups, exercises, cooldowns, number, name,ind, isRest, handleRest, value, handleSelect}) {
    return (
        <div className='daysContainer'>
            <form className="daysForm">
                <span className="dayLabel">Day {number} : </span>
                {isRest ? <span>Rest Day</span> : 
                <>
                <select className="selectWorkouts" onChange={handleSelect}>
                    <option disabled selected>Warm Ups</option>
                    {warmups.map((item, index)=> <option name={name} key={item._id+ number} value={item._id}>{item.name}</option>)}
                </select>
                <select className="selectWorkouts" onChange={handleSelect}>
                    <option disabled selected>Exercises</option>    
                    {exercises.map((item, index)=> <option name={name} key={item._id+ number} value={item._id}>{item.name}</option>)}
                </select>
                <select className="selectWorkouts" onChange={handleSelect}>
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
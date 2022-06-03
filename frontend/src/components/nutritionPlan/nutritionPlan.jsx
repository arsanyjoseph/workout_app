import { useState } from "react"
import { useParams } from "react-router-dom"
import {IoMdAddCircleOutline} from 'react-icons/io' 
import {MdOutlineDeleteSweep} from 'react-icons/md'
import { FormControl, FormControlLabel, InputLabel, OutlinedInput, InputAdornment, Switch, Box } from "@mui/material"
import './nutritionPlan.css'
import MaterialUIPickers from "../datePicker/datePicker"
import handleErr from "../utils/errorAlert"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function NutritionPlan() {
    const {id} = useParams()
    const navigate = useNavigate()
    const {user} = useSelector((state)=> state.auth)
    const np = {
        protein: 0,
        fat: 0,
        carb: 0
    }
    const [name, setName] = useState('')
    const [plan, setPlan] = useState([np])
    const [isRange, setIsRange] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [err, setErr] = useState(false)
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    
    const changeTime = ()=> {
        setIsRange(!isRange)
    }
    const addDay = ()=> {
        setPlan([...plan, np])
        let endMillis = endDate.getTime()
        let dayMillis = 86400000
        setEndDate(new Date(endMillis + dayMillis))
    }
    const removeDay = ()=> {
        const newPlan = plan.splice(1-plan.length)
        setPlan(newPlan)
        let endMillis = endDate.getTime()
        let dayMillis = 86400000
        if(startDate.getTime() == endDate.getTime()) {
            setEndDate(startDate)
        } else {
            setEndDate(new Date(endMillis - dayMillis))
        }
    }
    const handlePlanName = (e)=> {
        setName(e.target.value)
    }
    const handleChange = (e, index)=> {
        e.preventDefault()
        plan[index][e.target.name] = parseInt(e.target.value)
        setPlan([...plan])
    }

    const handleDateChange = (newVal, setState)=> {
        const selectedTime = newVal.getTime()
        if(selectedTime < Date.now()) {
            setState(Date.now())
        } else {
            setState(newVal)
        }
        console.log()
    }

    const savePlan = ()=> {
        if(!isRange) {
            setEndDate(startDate)
        }
        if (name.length === 0 || !name ) {
            setMessage('Please, Provide a Valid Name')
            handleErr(setErr)
        } else if(endDate.getTime() < startDate.getTime() && isRange) {
            setMessage('Error!! Cannot set End Date before Start Date')
            handleErr(setErr)
        } else if (plan.length === 0) {
            setMessage('Please, add at least 1 Day Plan')
            handleErr(setErr)
        } else {
            let data = {
                name: name,
                startDate: startDate,
                endDate: isRange ? endDate : startDate,
                plan: plan,
                userId: id,
            }
            asyncFunc.createItem('/api/nutritionplans/', data, user.token )
            navigate(`/dashboard/users/${id}`)
        }
    }
    if(!success) {
    return (
        <div className="newCoolDownContainer progCreate">
            <h1>New Nutrition Plan</h1>
            <form>
                <input className='progName' type='text' placeholder='Plan Name' value={name} onChange={handlePlanName}/>
            </form>
            <div className='progController'>
                <Box
                    component="form"
                    variant='standard'
                    onChange={changeTime}
                    sx={{color: 'black'}}
                >
                    <FormControlLabel control={<Switch name='isRange' checked={isRange} />} label={isRange ? 'Time Range' : '1 Day'} />
                </Box>
                <br/>
                {isRange && <> <button className='weekBtn' onClick={addDay}><IoMdAddCircleOutline/></button>
                <button className='weekBtn' onClick={removeDay}><MdOutlineDeleteSweep/></button></>}
            </div>
            <div className="daysPlan">
                {plan.map((item, index)=> <DayPlan key={index} count={index} carb={item.carb} fat={item.fat} protein={plan[index].protein} handleChange={(e, ind)=>handleChange(e, index)} /> )}
            </div>
            <div>
                <MaterialUIPickers label={isRange ? 'Start Date' : 'Date'} value={startDate} handleChange={(newVal)=> handleDateChange(newVal, setStartDate)} />
                {isRange && <MaterialUIPickers label='End Date' value={endDate} handleChange={(newVal)=> handleDateChange(newVal, setEndDate)} />}
            </div>
            <button className="weekBtn" onClick={savePlan}>Save</button>
            {err && <div className='errMessage userAssignErr' >{message}</div>}
        </div>
    )
}   if (success) {
    return(
        <div className="newCoolDownContainer progCreate">
            <h1>Nutrition Plans</h1>
            <h3 style={{color: 'green'}}>{name} Created Successfully </h3>
        </div>
    )
}
}

function DayPlan ({count, carb, fat, protein, handleChange}) {
    return (
        <div className="dayPlanCont">
            <h4>Day {count + 1}</h4>
            <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-protein">Proteins</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-protein"
                    endAdornment={<InputAdornment position="end">gm</InputAdornment>}
                    label='protein'
                    type='number'
                    name='protein'
                    value={protein}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-fat">Fats</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-fat"
                    endAdornment={<InputAdornment position="end">gm</InputAdornment>}
                    label='fat'
                    type='number'
                    name='fat'
                    value={fat}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-carb">Carbs</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-carb"
                    endAdornment={<InputAdornment position="end">gm</InputAdornment>}
                    label='carb'
                    type='number'
                    name='carb'
                    value={carb}
                    onChange={handleChange}
                />
            </FormControl>
        </div>
    )
}
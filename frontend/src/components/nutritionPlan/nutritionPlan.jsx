import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FormControl, InputLabel, OutlinedInput, InputAdornment, Switch, Box } from "@mui/material"
import './nutritionPlan.css'
import {FaCopy, FaPaste} from 'react-icons/fa'
import handleErr from "../utils/errorAlert"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function NutritionPlan() {
    const {id} = useParams()
    const navigate = useNavigate()

    const {user} = useSelector((state)=> state.auth)
    const [dayCopy, setDayCopy] = useState(null)
    const [addMode, setAddMode] = useState(true)
    const [plan, setPlan] = useState([{
        protein: 0,
        fat: 0,
        carb: 0
    }, {
        protein: 0,
        fat: 0,
        carb: 0
    }, {
        protein: 0,
        fat: 0,
        carb: 0
    }, {
        protein: 0,
        fat: 0,
        carb: 0
    }, {
        protein: 0,
        fat: 0,
        carb: 0
    }, {
        protein: 0,
        fat: 0,
        carb: 0
    }, {
        protein: 0,
        fat: 0,
        carb: 0
    }])
    const [editPlan, setEditPlan] = useState([])
    const [err, setErr] = useState(false)
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    
    const handleChange = (e, item)=> {
       item[e.target.name] = parseInt(e.target.value)
       setPlan([...plan])
    }

    const handleCopy = (e, item)=> {
        setDayCopy(item)
    }
    const handlePaste = (e, item)=> {
        item.carb = dayCopy.carb
        item.fat = dayCopy.fat
        item.protein = dayCopy.protein
        setPlan([...plan])
    }
    const savePlan = ()=> {
        let data = {
            plan: plan,
            userId: id
        }
        asyncFunc.createItem('/api/nutritionplans/', data, user.token)
        navigate(`/dashboard/users/${id}`)
    }

    const updatePlan = ()=> {
        let data = {
            plan: editPlan.plan,
            id: editPlan._id
        }
        asyncFunc.updateItem(`/api/nutritionplans/`, editPlan._id, data, user.token)
    }

    useEffect(()=> {
        asyncFunc.getTodayUser('/api/nutritionplans/today/user/', id, {},  user.token).then((data)=> {
            if(data.plan && data.plan.length > 0) {
                setEditPlan(data)
                setAddMode(false)
            }
        })
    },[addMode])
    if(!success && addMode) {
    return (
        <div className="newCoolDownContainer progCreate">
            <h1>New Nutrition Plan</h1>
            <div className="daysPlan">
                {plan.map((item, index)=> <DayPlan key={index} count={index} carb={item.carb} fat={item.fat} protein={item.protein} handleCopy={(e, i)=>handleCopy(e, item)} handlePaste={(e, i)=>handlePaste(e, item)} calories={item.carb*2} isCopy={dayCopy !== null} handleChange={(e, i)=>handleChange(e, item)} /> )}
            </div>
            
            <button className="weekBtn" onClick={savePlan}>Save</button>
            {err && <div className='errMessage userAssignErr' >{message}</div>}
        </div>
    )
} 
    if (success) {
    return(
        <div className="newCoolDownContainer progCreate">
            <h1>Nutrition Plans</h1>
            <h3 style={{color: 'green'}}> Created Successfully </h3>
        </div>
    )
}
    if (!addMode) {
        return (
            <div className="newCoolDownContainer progCreate">
            <h1>Edit Nutrition Plan</h1>
            <div className="daysPlan">
                {editPlan.plan.map((item, index)=> <DayPlan key={index} count={index} carb={item.carb} fat={item.fat} protein={item.protein} handleCopy={(e, i)=>handleCopy(e, item)} handlePaste={(e, i)=>handlePaste(e, item)} calories={item.carb*2} isCopy={dayCopy !== null} handleChange={(e, i)=>handleChange(e, item)} /> )}
            </div>
            <button className="weekBtn" onClick={updatePlan}>Save</button>
            {err && <div className='errMessage userAssignErr' >{message}</div>}
        </div>
        )
    }
}

function DayPlan ({count, carb, fat, protein, calories, handleChange, handleCopy, isCopy, handlePaste}) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return (
        <div className="dayPlanCont">
            <h4>{days[count]}</h4> <span className="weekBtn" style={{ fontSize: 'large'}} onClick={handleCopy}>Copy <FaCopy/></span>
            {isCopy && <span className="weekBtn" style={{ fontSize: 'large'}} onClick={handlePaste}>Paste<FaPaste/></span>}
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
            <span style={{color: 'black'}}>Calories: {calories}</span>
        </div>
    )
}
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CircularIndeterminate from "../spinner"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import handleDate from "../utils/dateHandler"
import extractData from '../utils/extractData'
import './programView.css'
import MaterialUIPickers from '../datePicker/datePicker';
import handleErr from "../utils/errorAlert"
import searchArray from "../utils/extractName"

export default function ProgramView () {
    const navigate = useNavigate()
    const {id} = useParams()
    const {users} = useSelector((state)=> state.users)
    const {user} = useSelector((state)=> state.auth)
    const url = '/api/programs/'
    const [prog, setProg] = useState({})
    const [assign, setAssign] = useState(false)
    const [err, setErr] = useState(false)
    const [userAssign, setUserAssign] = useState({
        userId: '',
        startDate: Date.now(),
        endDate: Date.now(),
        isComplete: false
    })

    //Handle Delete Program
    const handleDelete = (e)=> {
        e.preventDefault()
        asyncFunc.handleDelete(url ,id, user.token)
        navigate('/dashboard/programs/')
    }
    // Handle Set Start Date-User Assign
    const handleStartDate = (val)=> {

        setUserAssign((prevState)=> ({
            ...prevState,
            startDate: val,
        }))
    }
    // Handle Set End Date-User Assign
    const handleEndDate = (val)=> {
        setUserAssign((prevState)=> ({
            ...prevState,
            endDate: val
        }))
    }
    // Handle Set User Id-Assign User
    const handleUserName = (e)=> {
        e.preventDefault()
        setUserAssign((prevState)=> ({
            ...prevState,
            userId: e.target.value
        }))
    }
    //Handle Assign User
    const handleAssign = (e)=> {
        e.preventDefault()
        const progLength = prog.details.length
        const diff = Math.abs(Math.ceil((userAssign.endDate - userAssign.startDate)/(24*60*60*1000)))
        if((diff + 1) == progLength) {
            asyncFunc.updateItem(url, id, userAssign, user.token, setProg)
            setUserAssign({
                userId: '',
                startDate: Date.now(),
                endDate: Date.now()
            })
            setAssign(false)
        } else {
            handleErr(setErr)
        }
    }

    useEffect(()=> {
        if(id) {
            asyncFunc.getItem(url, id, user.token, setProg)
        }
        return ()=> setProg({})
    },[])

    if(!prog || !prog.name) {
        return <CircularIndeterminate />
    }

    if(assign) {
        return (
        <div className="coolDownAssignContainer">
            <div className="formHead">Assign User</div>
            <div className="formBody">
                <form className="formCoolDown">
                    <select name="user" onChange={handleUserName}>
                        <option selected disabled>Select A User</option>
                        {users.map((item,index)=> <option key={index} value={item._id}>{item.firstName + ' ' + item.lastName}</option>)}
                    </select>
                </form>
                <br/>
                <MaterialUIPickers label='Start Date' value={userAssign.startDate} handleChange={handleStartDate} />
                <br/>
                <br/>
                <MaterialUIPickers label='End Date' value={userAssign.endDate}  handleChange={handleEndDate}/>
                <br/>
                <br/>
                <button className="submitBtn" onClick={handleAssign}>Assign</button>
            </div>
            {err && <div className='errMessage' >Sorry, This is a {prog.details.length} Day(s) Program... Please, Recheck Dates</div>}
            </div>
        )
    }

    if(prog && prog.name) {
        return (
            <div className='cooldownViewContainer'>
                <div className="buttons">
                    <button className='submitBtn' onClick={()=> navigate('/dashboard/programs/') } >Back</button>
                    <button className='submitBtn' >Edit</button>
                    <button className='submitBtn' onClick={handleDelete} >Delete</button>
                    <button className='submitBtn' onClick={()=> setAssign(true)}>Assign</button>
                </div>
                <h1>{prog.name}</h1>
                <h4>Created @ {handleDate(prog.createdAt)}</h4>
                <h4>{prog.usersIds.length > 0 ? prog.usersIds.map((item, index)=> <span className="dayDetails">{searchArray(item.userId, users) + ', '}</span> ) : <span>No Users Assigned Yet</span>}</h4>
                {prog.details.map((item,index)=> <DisplayDay key={index} day={item} index={index +1} /> )}
            </div>
        )
    }
}

function DisplayDay ({day, index}) {
    const navigate = useNavigate()
    const {workouts} = useSelector((state)=> state.workouts)
    return (
        <div className="dayContainer">
            <h2>Day {index}</h2>
            {day.isRest ? <span>Rest Day</span> : <>
            <div>
                <span className="dayTitles">WarmUp: </span>
                <span className="dayDetails" onClick={()=> navigate(`/dashboard/warmup/${day.warmUp}`)}>
                    {day.warmUp ? extractData(day.warmUp, workouts.warmups) : 'No Warm Up'}
                </span>
            </div>
            <div>
                <span className="dayTitles">Exercise: </span>
                <span className="dayDetails" onClick={()=> navigate(`/dashboard/exercise/${day.exercise}`)}>
                    {day.exercise ? extractData(day.exercise, workouts.exercises) : 'No Exercise'}
                </span>
            </div>
            <div>
                <span className="dayTitles">CoolDown: </span>          
                <span className="dayDetails" onClick={()=> navigate(`/dashboard/cooldown{day.coolDown}`)}>
                    {day.coolDown ? extractData(day.coolDown, workouts.cooldowns) : 'No Cool Down'}
                </span>
            </div>
            </>}
        </div>
    )
}
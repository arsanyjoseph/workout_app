import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CircularIndeterminate from "../spinner"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import NavDash from './nav'
import {CgMenuGridR}  from 'react-icons/cg'
import './userView.css'
import AddDetails from "./assignDetails"
import Calendar from "./userCalendar"
import {CgAddR} from 'react-icons/cg'
import EventHandler from "./calendarEvent"



export default function UserView () {
    const navigate = useNavigate()
    const url = '/api/users/'
    const {user} = useSelector((state)=> state.auth)
    const {id} = useParams()

    const [userSelected, setUserSelected] = useState({})
    const [toggleMenu , setToggleMenu] = useState(false)
    //State Control Showing Event Assign
    const [eventForm, setEventForm] = useState(false)
    //State Control Showing Personal Info
    const [userPersonal, setUserPersonal] = useState(false)

    const [name, setName] = useState('')
    const [wos, setWos] = useState([])

    //States Controlling Assigning Event Workouts
    const [date, setDate] = useState(Date.now())
    const [type, setType]= useState('')
    const [data, setData] = useState([])
    const [workoutId, setWorkoutId] = useState(null)
    const [redirect, setRedirect] = useState(null)

    const urlAssign = `/api/workouts/`

    //Handle Assign Workout Date
    const handleChangeDate = (newValue)=> {
        setDate(newValue.toISOString())
    }

    const handleType = (e)=> {
        e.preventDefault()
        const typeName = e.target.value.toLowerCase()
        setType(typeName)
        asyncFunc.getItems(urlAssign + typeName, user.token, setData)
    }

    const handleAssign = (e)=> {
        e.preventDefault()
        const dataAssign = {
            userId: id,
            isComplete: false,
            setDate: date
        }
        asyncFunc.updateItem(urlAssign + type + '/', workoutId, dataAssign, user.token, setRedirect)
        setDate(Date.now())
        setType('')
        setData([])
        setWorkoutId(null)
        setEventForm(false)
        
    }
    //Showing Side Bar
    const showNavdash = ()=> {
        setToggleMenu(!toggleMenu)
    }

    //For test
    const events = [
        { title: 'event 1', date: '2022-05-02', publicId: '012' },
        { title: 'event 2', date: '2022-05-01', publicId: '013' }
      ]
    //Convert Name to lowerCase
    const lowerName = name.toLowerCase()
    //Show Personal Info Assign/View
    const handleEvent = (e)=> {
        e.preventDefault()
        setName(e.target.value)
        setUserPersonal(true)
    }
    //Cancel Overlay Forms
    const cancelEventForm = (e, setState) => {
        e.preventDefault()
       setState(false)
    }

    useEffect(()=> {
        if(!id) {
            navigate('/dashboard/users')
        } else {
            asyncFunc.getItem(url, id, user.token, setUserSelected)
            asyncFunc.getItems(`/api/workouts/users/${id}`, user.token ,setWos)
        }
    },[])

    if(!userSelected.firstName) {
        return <>
                 <CircularIndeterminate />
            </>
    }

    if(userSelected) {
       return (
        <div>
            <div style={{margin: '0 auto'}}>
                <h1 className="userName" onClick={()=>navigate(`/dashboard/users/${id}/view`)}>{userSelected.firstName + ' ' + userSelected.lastName}</h1>
            </div>
             <div className="showBtnContainer showIcon" onClick={showNavdash}>
                <CgMenuGridR style={{fontSize: '2em', pointerEvents: 'none'}}/>
            </div>
            <div className="showBtnContainer addEvnt" onClick={(e)=> setEventForm(true)}>
                <CgAddR style={{fontSize: '2em', pointerEvents: 'none'}} />
            </div>
            <div className="userContainer">
                <NavDash setEvents={(e)=>handleEvent(e)} show={toggleMenu}/>
                <div className="userContent" style={{backgroundColor: 'var(--grey)', color: 'black', borderRadius: '5px', padding: '1em'}}>
                    <Calendar events={events}/>
                </div>
            </div>
            {eventForm && <EventHandler value={date} 
            data={data} type={type}
             handleChange={handleChangeDate}
              closeEventForm={(e)=>cancelEventForm(e, setEventForm)}
            handleType={(e)=> handleType(e)}
            handleWorkoutId={(e)=> setWorkoutId(e.target.value)}
            handleAssign={handleAssign}
            />}

            {userPersonal && <AddDetails data={userSelected[lowerName]} eventName={name} cancelEvent={(e)=>cancelEventForm(e, setUserPersonal)} />}
        </div>
        ) 
    }
    
}
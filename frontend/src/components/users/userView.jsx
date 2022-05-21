import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import './userView.css'

import CircularIndeterminate from "../spinner"
import NavDash from './nav'
import Calendar from "./userCalendar"
import ItemsTable from "./itemsTable";

import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import extractType from "../utils/userDataType"
import extractData from "../utils/extractData";
import { getAllUsers } from "../../features/users/usersSlice";
import handleErr from '../utils/errorAlert'

import { Modal } from "@mui/material"

import {CgMenuGridR}  from 'react-icons/cg'
import {MdLibraryAdd, MdSave} from 'react-icons/md'
import {BsBatteryCharging} from 'react-icons/bs'



export default function UserView () {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const url = '/api/users/'
    const {user} = useSelector((state)=> state.auth)
    const {workouts} = useSelector((state)=> state.workouts)
    const {id} = useParams()

    const [userSelected, setUserSelected] = useState({})
    const [toggleMenu , setToggleMenu] = useState(false)
    const [newMode, setNewMode] = useState(false)
    const [eventModal, setEventModal] = useState(false)
    const [noId, setNoId] = useState(false)
    const [err, setErr] = useState(false)

    const [showMS, setShowMS] = useState(false)
    const [msArr, setMsArr] = useState([])
    const [viewAll ,setViewAll] = useState(false)
    const [allMs, setAllMs] = useState([])

    const [name, setName] = useState('')
    const [itemsArr, setItemsArr] = useState([])
    const [calEvents, setCalEvents] = useState([])
    const [itemView, setItemView] = useState({})

    const [item, setItem] = useState({
        type: '',
        title: '',
        description: '',
        createdAt: new Date(),
    })
    const [userPersonal, setUserPersonal] = useState(false)
    const [redirect, setRedirect] = useState(null)
    //Showing Side Bar
    const showNavdash = ()=> {
        setToggleMenu(!toggleMenu)
    }

    const handleShowMS = ()=> {
        asyncFunc.getTodayUser('/api/metricsets/today/user/', id, {date: Date.now()}, user.token, setMsArr).then((data)=> setMsArr(data))
        setShowMS(true)
    }

    const handleViewAll = (e)=> {
        e.preventDefault()
        asyncFunc.getItemsByUserId('/api/metricsets/all/user/', {id: id}, user.token, setAllMs)
        setViewAll(true)
    }

    //Show Personal Info Assign/View
    const handleOpenModal = (e)=> {
        setName(e.target.value)
        setItemsArr(userSelected.personalDetails)
        setUserPersonal(true)
    }

    const handleCloseModal = (e)=> {
        setItemsArr([])
        setName('')
        setItem({
            type: '',
            title: '',
            description: '',
            createdAt: new Date(),
        })
        setUserPersonal(false)
    }

    const handleChangeItem = (e, setState) => {
        e.preventDefault()
        setState((prevState)=> ({
            ...prevState,
                [e.target.name]: e.target.value
        }))
    }

    const handleSaveItem = (e)=> {
        e.preventDefault()
        if(item.type === '' || item.title === '') {
            handleErr(setErr)
        } else {
            asyncFunc.updateItem(url, id, {item: item}, user.token)
            dispatch(getAllUsers(user.token))
            setNewMode(false)
            handleCloseModal()   
        }
    }

    const toggleNewMode = ()=> {
        setItem({
            type: `${name.toLowerCase()}`,
            title: '',
            description: '',
            createdAt: new Date(),
        })
        setNewMode(!newMode)
    }

    const convertNames = (data) => {
        let newArr = []
        data.map((item, index)=> {
            if(item.title === 'Rest') {
                newArr.push(item)
            }
            if(item.title === 'WarmUp') {
                const newItem = {
                    title: extractData(item.id, workouts.warmups),
                    id: item.id,
                    date: item.date
                }
                newArr.push(newItem)
            }
            if(item.title === 'Exercise') {
                const newItem = {
                    title: extractData(item.id, workouts.exercises),
                    id: item.id,
                    date: item.date
                }
                newArr.push(newItem)
            }
            if(item.title === 'CoolDown') {
                const newItem = {
                    title: extractData(item.id, workouts.cooldowns),
                    id: item.id,
                    date: item.date
                }
                newArr.push(newItem)
            }
            return newArr
        })
        setCalEvents(newArr)
    }

    const handleEventClick = (arg)=> {
        const woId = arg.event._def.publicId
        const typeName = arg.event._def.title.toLowerCase()
        if(woId === 'null') {
            setNoId(true)
        } else {
            asyncFunc.getItem(`/api/workouts/${typeName}/`, woId, user.token, setItemView)
        }
        setEventModal(true)
    }

    const handleEventClose = ()=> {
        setNoId(false)
        setItemView({})
        setEventModal(false)
    }

    useEffect(()=> {
        if(!id) {
            navigate('/dashboard/users')
        } else {
            asyncFunc.getItem('/api/users/', id, user.token, setUserSelected)
            asyncFunc.getWorkoutsByUserId('/api/programs/users/', id, user.token).then((data)=> {
                convertNames(data)
            })
        }
    },[itemsArr, dispatch])

    if(!userSelected.firstName || calEvents.length === 0) {
        return <>
                 <CircularIndeterminate />
            </>
    }

    if(userSelected && calEvents.length > 0) {
       return (
        <div>
            <div style={{margin: '0 auto'}}>
                <h1 className="userName" onClick={()=>navigate(`/dashboard/users/${id}/view`)}>{userSelected.firstName + ' ' + userSelected.lastName}</h1>
            </div>
             <div className="showBtnContainer showIcon" onClick={showNavdash}>
                <CgMenuGridR style={{fontSize: '2em', pointerEvents: 'none'}}/>
            </div>
            <div className="userContainer">
                <NavDash setEvents={(e)=>handleOpenModal(e)} show={toggleMenu} showMS={handleShowMS}/>
                <div className="userContent">
                    {calEvents.length > 0 && <Calendar events={calEvents} handleClick={handleEventClick}/>}
                </div>
            </div>
            <Modal
            open={eventModal}
            onClose={handleEventClose}
            >   
                <div className="modalDiv">
                    <h1>View</h1>
                    <div className="modalBody">
                        {noId && 
                        <>
                            <h2 style={{textAlign: 'center'}}>Rest</h2>
                            <BsBatteryCharging style={{fontSize: '2em'}}/>
                        </>}
                        {itemView.name && 
                        <>
                        <h1>{itemView.name}</h1>
                        <h2>{itemView.instruction}</h2>
                        {itemView.link && 
                        <div className='vidContainer'> 
                            <iframe width='100%' height='100%' src={asyncFunc.linkVid(itemView.link)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>       
                        </div>}
                        </>}
                    </div>
                </div>

            </Modal>
            <Modal
                open={userPersonal}
                onClose={handleCloseModal}
            >
                    <div className="modalDiv">
                        <h1>{name}</h1>
                        <div className="itemsCont">
                            {itemsArr.length > 0 && extractType(itemsArr, name.toLowerCase()).length > 0 ? <ItemsTable data={extractType(itemsArr, name.toLowerCase())} /> : <h2>No Items Found</h2>}
                        </div>
                        {newMode && <form className="newItemForm">
                            <input type='text' name="title" placeholder={`${name} Title`} value={item.title} onChange={(e,setState)=> handleChangeItem(e, setItem)}/>
                            <textarea type='text' name="description" placeholder={`${name} Description`} value={item.description} onChange={(e,setState)=> handleChangeItem(e, setItem)}/>
                            <button className="weekBtn" onClick={handleSaveItem}><MdSave/></button>
                        </form>}
                        <button className="weekBtn" style={{float: 'right'}} onClick={toggleNewMode}><MdLibraryAdd/></button>
                        {err && <div className='errMessage' style={{fontSize: 'medium', textAlign: 'center'}}>Add a Title</div>}
                    </div>
            </Modal>
            <Modal
                open={showMS}
                onClose={()=>setShowMS(false)}
                >   
                    <div className="modalDiv" style={{marginTop: '8em', textAlign: 'center'}}>
                        <h1>Metric Sets</h1>
                        <button className="weekBtn" style={{fontSize: 'small', margin: '0 auto'}} onClick={handleViewAll}>View All Metrics</button>
                        <div className="msModalBody">
                            {!viewAll && msArr.map((item, index)=> <div className="msCont"  key={index}>
                                <h2>{item.name}:</h2>
                                <span>
                                    {item.metrics.map((it,ind)=> <h5 className="msDetails">{it.metric}: {item.usersAssigned.userAnswers[ind]} {it.unit}</h5>)}
                                </span>
                            </div>)}
                            {viewAll && allMs.map((item, index)=> <div className="msCont"  key={index}>
                                <h2>{item.name}:</h2>
                                <span>
                                    {item.metrics.map((it,ind)=> <h5 className="msDetails">{it.metric}:  {it.unit}</h5>)}
                                </span>
                            </div> )}
                        </div>
                    </div>
            </Modal>
        </div>
        ) 
    }
}
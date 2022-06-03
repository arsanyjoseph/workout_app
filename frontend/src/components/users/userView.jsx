import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import moment from 'moment';


import './userView.css'

import CircularIndeterminate from "../spinner"
import NavDash from './nav'
import Calendar from "./userCalendar"
import ItemsTable from "./itemsTable";

import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import extractType from "../utils/userDataType"
import extractData from "../utils/extractData";
import handleDate from "../utils/dateHandler";
import { getAllUsers } from "../../features/users/usersSlice";
import handleErr from '../utils/errorAlert'

import { Modal } from "@mui/material"

import {CgMenuGridR}  from 'react-icons/cg'
import {MdLibraryAdd, MdSave} from 'react-icons/md'
import {BsBatteryCharging} from 'react-icons/bs'
import {TiDelete} from 'react-icons/ti'

import MaterialUIPickers from '../datePicker/datePicker'
import ImgMediaCard from "../card-landingPage/card";

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

    const [showPP, setShowPP] = useState(false)
    const [viewAllPP, setViewAllPP] = useState(false)
    const [todayPics, setTodayPics] = useState([])

    const [showNP, setShowNP] = useState(false)
    const [npItems, setNPItems] = useState([])
    const [dateNP, setDateNp] = useState(new Date())

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
//Nutrition Plan Funcs
    const handleNPViewToday = ()=> {
        setViewAll(false)
        asyncFunc.getTodayUser('/api/nutritionplans/today/user/', userSelected._id, {date: new Date() }, user.token, setNPItems)
        console.log(npItems)
    }
    //Handle Date for Search
    const changeDateNP = (newVal) => {
        setDateNp(newVal)
    }
    //Open Modal
    const handleShowNP = ()=> {
        setShowNP(true)
    }
    //Close Modal
    const closeNP = ()=> {
        setNPItems([])
        setShowNP(false)
    }
    const deleteNP = (e) => {
        const npId = e.target.value
       asyncFunc.handleDelete('/api/nutritionplans/', npId, user.token )
       npItems.map((item, index)=> {
           if(item._id == npId) {
               npItems.splice(index, 1)
               setNPItems([...npItems])
           }
       } )
    }

    const handleNPView = ()=> {
        setNPItems([])
        asyncFunc.getTodayUser('/api/nutritionplans/today/user/', userSelected._id, {date: dateNP }, user.token, setNPItems)
        if(npItems.length === 0) {
            handleErr(setErr)
        }
        console.log(npItems)
    }

    const handleNPAdd = ()=> {
        navigate(`/dashboard/users/${id}/np`)
    }

    //Ms
    const handleViewAll = (e)=> {
        e.preventDefault()
        asyncFunc.getItemsByUserId('/api/metricsets/all/user/', {id: id}, user.token, setAllMs)
        setViewAll(true)
        console.log(allMs)
    }

    const handleTodayView = (e)=> {
        e.preventDefault()
        setViewAll(false)
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

    const handleShowPP = ()=> {
        setShowPP(true)
        let newArr = []    
        userSelected.progressPics.map((item)=> {
            const dateMod = moment(item.createdAt)
            const compDate = moment.utc()
            if(moment(dateMod).isSame(compDate, 'day')) {
                newArr.push(item)
            }
        })
        setTodayPics([...newArr])
    }

    const closePP = ()=> {
        setShowPP(false)
        setTodayPics([])
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

    if(!userSelected.firstName && calEvents.length === 0) {
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
            <div className="userContainer">
                <NavDash setEvents={(e)=>handleOpenModal(e)} show={toggleMenu} showMS={handleShowMS} showPP={handleShowPP} showNP={handleShowNP}/>
                <div className="userContent">
                    <Calendar events={calEvents} handleClick={handleEventClick}/>
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
                    <div className="modalDiv" style={{marginTop: '8em', textAlign: 'center', overflowY: 'scroll'}}>
                        <h1>Metric Sets</h1>
                        {!viewAll && <button className="weekBtn" style={{fontSize: 'small', margin: '0 auto'}} onClick={handleViewAll}>View All Metrics</button>}
                        {viewAll && <button className="weekBtn" style={{fontSize: 'small', margin: '0 auto'}} onClick={handleTodayView}>Today's Metrics</button>}
                        <div className="msModalBody">
                            {!viewAll && msArr.map((item, index)=> <div className="msCont"  key={index}>
                                <h2>{item.name}:</h2>
                                <span>
                                    {item.metrics.map((it,ind)=> <h5 key={it} className="msDetails">{it.metric}: {item.usersAssigned.userAnswers[ind]} {it.unit}</h5>)}
                                </span>
                                {item.usersAssigned.userAnswers.length === 0 && <span style={{color: 'red'}}>{userSelected.firstName} missed the MS</span>}
                            </div>)}
                            {viewAll && allMs.map((item, index)=> <div className="msCont"  key={index}>
                                <h2>{item.name}:</h2>
                                <span>
                                    {item.metrics.map((it,ind)=> <h5 key={it} className="msDetails">{it.metric}: {item.usersAssigned.userAnswers[ind]} {it.unit}</h5>)}
                                </span>
                                {item.usersAssigned.userAnswers.length === 0 && <span style={{color: 'red'}}>{userSelected.firstName} missed the MS</span>}
                                <span className="weekBtn">{handleDate(item.usersAssigned.date)}</span>
                            </div> )}
                        </div>
                    </div>
            </Modal>
            <Modal
                open={showPP}
                onClose={closePP}
            >
                <div className="modalDiv" style={{ width: '80%', height: '80%', marginTop: '5em'}}>
                    <h1>Progress Pics</h1>
                   {viewAllPP &&  <div className="ppDiv" style={{overflowX: 'scroll'}}>
                        {userSelected.progressPics && userSelected.progressPics.length > 0 ? userSelected.progressPics.map((item, index)=> <ImgMediaCard src={`/${item.name}`} paragraph={handleDate(item.createdAt)} alt={userSelected.firstName} />) : <h1>No Pics Found</h1>}
                    </div>}

                    {!viewAllPP && <div className="ppDiv" style={{overflowX: 'scroll'}}>
                    {todayPics.length > 0 ? todayPics.map((item, index)=> <ImgMediaCard src={`/${item.name}`} paragraph={handleDate(item.createdAt)} alt={userSelected.firstName} /> )  : <h1>No Pics Found</h1>}
                </div> }
                    <button style={{margin: '1em'}} className="weekBtn" onClick={()=> setViewAllPP(!viewAllPP)}>{viewAllPP ? 'View Today' : 'View All'}</button>
                </div>
            </Modal>
            <Modal
                open={showNP}
                onClose={closeNP}
            >
                <div className="modalDiv"  style={{overflowY: 'scroll'}}>
                    <h1>Nutrition Plan</h1>
                    <div className="ppDiv">
                        <div className="buttons">
                            <button className="weekBtn" onClick={()=> {
                                setViewAll(true)
                                setNPItems([])
                            }}>View by Date</button>
                            <button className="weekBtn" onClick={handleNPViewToday}>View Today</button>
                            <button className="weekBtn" onClick={handleNPAdd}>Add</button>
                        </div>
                        {viewAll && <> <MaterialUIPickers label='Date' value={dateNP} handleChange={changeDateNP} /> <br/>
                        <button className="weekBtn" onClick={handleNPView}>Search</button> </>}
                        {npItems.map((item, index)=> <div key={index}  className="npCont">
                            <h2>{item.name} <button className="deleteBtn" value={item._id} onClick={deleteNP}><TiDelete pointerEvents='none'/></button></h2>
                            <div className="detailsCont">
                                <div className="detailsNP">
                                    <h5>Plan</h5>
                                    <span>Carbs: {item.plan.carb} gm</span><br/>
                                    <span>Fats: {item.plan.fat} gm</span><br/>
                                    <span>Proteins: {item.plan.protein} gm</span> 
                                </div>
                                {item.userInputs.isSubmit && 
                                <div className="detailsNP">
                                    <h5>{userSelected.firstName} Inputs</h5>
                                    <span>Carbs: {item.userInputs.carb} gm</span><br/>
                                    <span>Fats: {item.userInputs.fat} gm</span><br/>
                                    <span>Proteins: {item.userInputs.protein} gm</span> 
                                </div>}
                                {!item.userInputs.isSubmit && 
                                <div className="detailsNP">
                                    <h5>{userSelected.firstName} Inputs</h5>
                                    <span style={{color: 'red'}}>No Submit</span>
                                </div>}
                            </div>                            
                        </div>)}
                        {npItems.length === 0 && err && <span style={{color: 'red'}}>No Plans</span>}
                    </div>
                </div>
            </Modal>
        </div>
        ) 
    }
}
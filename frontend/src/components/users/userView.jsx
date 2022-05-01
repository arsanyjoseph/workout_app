import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CircularIndeterminate from "../spinner"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import NavDash from './nav'
import {CgMenuGridR}  from 'react-icons/cg'
import './userView.css'
import AddDetails from "./assignDetails"



export default function UserView () {
    const {user} = useSelector((state)=> state.auth)
    const {id} = useParams()
    const navigate = useNavigate()
    const [userSelected, setUserSelected] = useState({})
    const url = '/api/users/'
    const [toggleMenu , setToggleMenu] = useState(false)
    const [eventForm, setEventForm] = useState(false)
    const [name, setName] = useState('')
    const showNavdash = ()=> {
        setToggleMenu(!toggleMenu)
    }

    const handleEvent = (e)=> {
        e.preventDefault()
        setName(e.target.value)
        setEventForm(true)
    }

    const cancelEventForm = (e) => {
        e.preventDefault()
        setEventForm(false)
    }
    useEffect(()=> {
        if(!id) {
            navigate('/dashboard/users')
        }

        asyncFunc.getItem(url, id, user.token, setUserSelected)
    },[toggleMenu, showNavdash, setToggleMenu, eventForm])

    if(!userSelected.firstName) {
        return <>
                 <CircularIndeterminate />
            </>
    }

    if(userSelected) {
       return (
        <div>
             <h1 onClick={()=>navigate(`/dashboard/users/${id}/view`)}>{userSelected.firstName + ' ' + userSelected.lastName}</h1>
             <div className="showBtnContainer showIcon" onClick={showNavdash}>
                <CgMenuGridR style={{fontSize: '2em', pointerEvents: 'none'}}/>
            </div>
            <div className="userContainer">
                <NavDash setEvents={(e)=>handleEvent(e)} show={toggleMenu}/>
                <div className="userContent" style={{backgroundColor: 'white', color: 'black'}}></div>
                {eventForm && <AddDetails eventName={name} cancelEvent={(e)=> cancelEventForm(e)} />}
            </div>
        </div>
        ) 
    }
    
}
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CircularIndeterminate from "../spinner"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import NavDash from './nav'
import {CgMenuGridR}  from 'react-icons/cg'
import './userView.css'
import Calendar from "./userCalendar"
import { Modal } from "@mui/material"
import handleDate from '../utils/dateHandler'
import {MdLibraryAdd, MdSave} from 'react-icons/md'
import extractType from "../utils/userDataType"



export default function UserView () {
    const navigate = useNavigate()
    const url = '/api/users/'
    const {user} = useSelector((state)=> state.auth)
    const {id} = useParams()

    const [userSelected, setUserSelected] = useState({})
    const [toggleMenu , setToggleMenu] = useState(false)
    const [newMode, setNewMode] = useState(false)

    const [name, setName] = useState('')
    const [itemsArr, setItemsArr] = useState([])
    //Convert Name to lowerCase
    const lowerName = name.toLowerCase()

    const [item, setItem] = useState({
        type: '',
        title: '',
        description: '',
        createdAt: new Date,
    })
    const [userPersonal, setUserPersonal] = useState(false)


    const [redirect, setRedirect] = useState(null)
    //Showing Side Bar
    const showNavdash = ()=> {
        setToggleMenu(!toggleMenu)
    }

    //For test
    const events = [
        { title: 'event 1', date: '2022-05-02', publicId: '012' },
        { title: 'event 2', date: '2022-05-01', publicId: '013' }
      ]
    //Show Personal Info Assign/View
    const handleOpenModal = (e)=> {
        e.preventDefault()
        setName(e.target.value)
        const typeArr = extractType(userSelected.personalDetails, lowerName)
        setItemsArr([...typeArr])
        setUserPersonal(true)
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
        setItem((prevState)=> ({
            ...prevState,
                type: `${lowerName}`
        }))
        asyncFunc.updateItem(url, id, item,  user.token)
        setNewMode(false)
    }

    const toggleNewMode = ()=> {
        setItem({
            type: `${lowerName}`,
            title: '',
            description: '',
            createdAt: new Date
        })
        setNewMode(!newMode)
    }
    const checkType = ()=> {
        console.log(itemsArr)
    }

    useEffect(()=> {
        if(!id) {
            navigate('/dashboard/users')
        } else {
            asyncFunc.getItem('/api/users/', id, user.token, setUserSelected)
        }
    },[itemsArr])

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
            <div className="userContainer">
                <NavDash setEvents={(e)=>handleOpenModal(e)} show={toggleMenu}/>
                <div className="userContent" style={{backgroundColor: 'var(--grey)', color: 'black', borderRadius: '5px', padding: '1em'}}>
                    <Calendar events={events}/>
                </div>
            </div>
        <Modal
            open={userPersonal}
            onClose={()=> setUserPersonal(false)}
        >
                <div className="modalDiv previewDiv">
                    <h1>{name}</h1>
                    <div className="itemsCont">
                        {itemsArr.length > 0 && itemsArr.map((item, index)=> <div key={index} className="itemCont">
                            <h3>{`${index + 1} - `}{item.title} :</h3>
                            <p> {item.description}</p>
                            <h6>Created @: {handleDate(item.createdAt)}</h6>
                        </div>)}
                        <button onClick={checkType}>Test</button>
                    </div>
                    {newMode && <form className="newItemForm">
                        <input type='text' name="title" placeholder={`${name} Title`} value={item.title} onChange={(e,setState)=> handleChangeItem(e, setItem)}/>
                        <textarea type='text' name="description" placeholder={`${name} Description`} value={item.description} onChange={(e,setState)=> handleChangeItem(e, setItem)}/>
                        <button className="weekBtn" onClick={handleSaveItem}><MdSave/></button>
                    </form>}
                    <button className="weekBtn" style={{float: 'right'}} onClick={toggleNewMode}><MdLibraryAdd/></button>
                </div>
        </Modal>
        </div>
        ) 
    }
    
}
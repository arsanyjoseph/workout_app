import './assignDetails.css'
import {useEffect, useState} from 'react'
import {FaWindowClose} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import { useParams } from 'react-router-dom'

export default function AddDetails ({cancelEvent, eventName, data}) {
    const {user} = useSelector((state)=> state.auth)
    const eventLower = eventName.toLowerCase()
    const [newMode, setNewMode] = useState(false)
    const url = '/api/users/'
    const {id} = useParams()
    const handleNew = (e)=> {
        e.preventDefault()
        setNewMode(true)
    }
    const [formData, setFormData] = useState({
            title: '',
            description: '',
            createdAt: Date.now()
        })

    const handleChange = (e)=> {
        e.preventDefault()
        setFormData((prevState)=> ({
            ...prevState,
                [e.target.name]: e.target.value
        }))
    }

    const saveItem = (e)=> {
        e.preventDefault()
        console.log(formData)
        asyncFunc.updateItem(url, id, {goal: formData}, user.token)
    }
   

    useEffect(()=> {
        if(data) {
            console.log(data)
        }
    },[newMode])

    if(!newMode) {
        return (
            <div className="overlayBlur" >
            <div className='formContainer'>
            <span onClick={cancelEvent} className='closeIcon' ><FaWindowClose/></span>
            <div className="formHead"><h2>{eventName}</h2></div>
            <div className="formBody">
                <h1>View {eventName}</h1>
                <button className='submitBtn' onClick={(e)=> handleNew(e)}>Add {eventName}</button>
            </div>
            </div>
        </div>
        )
    }

    if(newMode) {
     return (
        <div className="overlayBlur">
            <div className='formContainer'>
            <span onClick={cancelEvent} className='closeIcon' ><FaWindowClose/></span>
            <div className="formHead"><h2>Add {eventName}</h2></div>
            <div className="formBody">
                <form className="formLogin">
                    <input  type='text' value={formData.title} name="title"  placeholder={`${eventName} Title`} onChange={handleChange}/>
                    <textarea  type='text' value={formData.description} name="description"  placeholder={`${eventName} Details`} onChange={handleChange}/>
                    <div className="buttons">
                        <button onClick={()=> setNewMode(false)} className="submitBtn">Back</button>
                        <button className="submitBtn" type="submit" onClick={saveItem}>Save</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
    }
}
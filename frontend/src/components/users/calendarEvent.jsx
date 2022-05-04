import {useEffect, useState} from 'react'
import {FaWindowClose} from 'react-icons/fa'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import { useSelector } from 'react-redux'
import MaterialUIPickers from "../datePicker/datePicker";
import './calendarEvent.css'


export default function EventHandler ({handleType, handleAssign, closeEventForm, handleWorkoutId, handleChange, value, data, type}) {
    const {user} = useSelector((state)=> state.auth)
    const types = ['WarmUp', 'Exercise', 'CoolDown']

    useEffect(()=> {
        console.log(data)
    },[data])
     return (
        <div className="overlayBlur">
            <div className='formContainer'>
                <span className='closeIcon' onClick={closeEventForm} ><FaWindowClose/></span>
            <div className="formHead"><h2>Add Event</h2></div>
            <div className="formBody">
                <form className='eventHandleForm'>
                    <select onChange={handleType}>
                        <option disabled selected>Workout Type</option>
                        {types.map((item, index)=> <option key={index} value={item.toLowerCase()}>{item}</option>)}
                    </select>
                    <br/>
                    {
                    data.length > 0 && 
                    <>
                    <select onChange={handleWorkoutId}>
                        <option disabled selected>Select {type}</option>
                        {data.map((item, index)=> <option key={index} value={item._id}>{item.name}</option>)}
                    </select>
                    <br/>
                    <MaterialUIPickers label='Date' value={value} handleChange={handleChange} />
                    <br/>
                    <button className='submitBtn' onClick={handleAssign}>Assign</button>
                    </>

                    }

                </form>
            </div>
            </div>
        </div>
    )
}
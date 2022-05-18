import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import extractData from '../utils/extractData'
import {Modal} from '@mui/material'

import {BsBatteryCharging} from 'react-icons/bs'
import {MdDoneOutline} from 'react-icons/md'

import { getCooldowns, getExercises, getWarmups } from "../../features/workouts/workoutSlice";

import './userWorkouts.css'

export default function UserWorkouts () {
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)
    const {workouts} = useSelector((state)=> state.workouts)
    const [todayWorkout, setTodayWorkout] = useState([])
    const [showPreview, setShowPreview] = useState(false)
    const [item, setItem] = useState({})

    const handleModalOpen = (e, type)=> {
        const WoId = e.target.value
        asyncFunc.getItem(`/api/workouts/${type}/`, WoId, user.token, setItem).then((data)=> setItem(data))
        setShowPreview(true)
    }

    const handleModalClose = (e)=> {
        setItem({})
        setShowPreview(false)
    }

    const markComplete = (e)=> {
        const cycleId = e.target.value
        asyncFunc.updateItem('/api/programs/users/', user.id, {cycleId: cycleId }, user.token)
    }
    useEffect(()=> {
        if(user) {
            dispatch(getExercises(user.token))
            dispatch(getCooldowns(user.token))
            dispatch(getWarmups(user.token))

            asyncFunc.getTodayUser('/api/programs/today/user/', user.id, {date: Date.now()}, user.token, setTodayWorkout )
            .then((data)=> setTodayWorkout(data))
        }
    },[])

    if (workouts) {
       return (
        <div className="userHomeContainer">
            <h1>Today's To Do List</h1>
            <div className='todayContainer'>
                {todayWorkout.length > 0 && todayWorkout.map((item, index)=> <div key={index} className="cycleCont">
                    {!item.isRest && 
                    <>
                    <span className='titleSpan'>Cycle {index + 1}</span>
                    <button className='weekBtn' value={item._id} onClick={markComplete}><MdDoneOutline pointerEvents='none'/></button>
                    <div>
                        <span className='titleSpan'>WarmUp:</span>
                        <button className='weekBtn homeWO' value={item.warmup} onClick={(e, type)=>handleModalOpen(e, 'warmup')}>{extractData(item.warmup, workouts.warmups)}</button>
                    </div>
                    <div>
                        <span className='titleSpan'>Exercise/s:</span>
                        {item.exercise.map((i, index)=> <>
                            <button className='weekBtn homeWO' key={index} value={i} onClick={(e, type)=>handleModalOpen(e, 'exercise')}>{extractData(i, workouts.exercises)}</button>
                        </>)}  
                    </div>
                    <div>
                        <span className='titleSpan'>CoolDown:</span>
                        <button className='weekBtn homeWO' value={item.cooldown} onClick={(e, type)=>handleModalOpen(e, 'cooldown')}>{extractData(item.cooldown, workouts.cooldowns)}</button>
                    </div>
                    <div>
                        <h2>Coach says: "{item.notes}"</h2>
                    </div>
                    </>}
                    {item.isRest && <>
                        <h1>Rest</h1>
                        <BsBatteryCharging/>
                    </>}
                    </div>
                )}

                <Modal
                open={showPreview}
                onClose={handleModalClose}
            >
                <div className="modalDiv previewDiv">
                    <h1>{item.name}</h1>
                    <h2>{item.instruction}</h2>
                    {item.link && 
                    <div className='vidContainer'> 
                        <iframe width='100%' height='100%' src={asyncFunc.linkVid(item.link)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>       
                    </div>}
                    
                </div>
            </Modal>
            {todayWorkout.length === 0 && <h1 style={{ textAlign: 'center'}}>No Program Assigned Yet</h1>}
            </div>
        </div>
    ) 
    }
    
}
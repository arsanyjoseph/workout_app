import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import extractData from '../utils/extractData'
import {Modal} from '@mui/material'
import moment from 'moment'

import {BsBatteryCharging} from 'react-icons/bs'
import {MdDoneOutline, MdUpload} from 'react-icons/md'
import axios from 'axios'
import { getCooldowns, getExercises, getWarmups } from "../../features/workouts/workoutSlice";

import './userWorkouts.css'

export default function UserWorkouts () {
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)
    const {workouts} = useSelector((state)=> state.workouts)
    const [todayWorkout, setTodayWorkout] = useState([])
    const [todayMetricSet, setTodayMetricSet] = useState([])
    const [todayNP, setTodayNP] = useState({})
    const [showPreview, setShowPreview] = useState(false)
    const [item, setItem] = useState({})
    const [msModal, setMsModal] = useState(false)
    const [msItem, setMsItem] = useState({})
    const [progressPics, setProgressPics] = useState(false)
    const [picsArray, setPicsArray] = useState([])
    const [cycleId, setCycleId] = useState('')
    const [cycle, setCycle] = useState({})
    const [files, setFiles] = useState([])
    const [newProg, setNewProg] = useState({})

    const day = moment().day()

    const openMsModal = (e)=> {
        e.preventDefault()
        let ind = e.target.value
        let newArr = []
        let answer = ''
        todayMetricSet[ind].metrics.map(()=> {
            newArr.push(answer)
        })
        setMsItem(todayMetricSet[ind])
        setMsModal(true)
    }

    const closeMsModal = (e)=> {
        setMsItem({})
        setMsModal(false)
    }
    
    const submitAnswers = (e)=> {
        e.preventDefault()
        asyncFunc.updateItem('/api/metricsets/', msItem._id, {answerUpdate : msItem.usersAssigned}, user.token)
        closeMsModal()
    }
    const handleAnswer = (e, index)=> {
        e.preventDefault()
        msItem.usersAssigned.userAnswers[index] = e.target.value
    }
    const uploadProgressPics = async (url, token, formData, setState)=> {
        const config = {
            headers: {  
                'Authorization': `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        }
        const response = await axios.post(url,formData, config)
        setState(response.data)
        return response.data
    }
    const onImgChange = (e)=> {
        e.preventDefault()
        const newArr = Object.entries(e.target.files)
        setPicsArray(newArr)
    }

    const onImgUpload = (e) => {
        e.preventDefault()
        let formData = new FormData();
        picsArray.map((item)=> {
            formData.append('progressPics', item[1])
        })
        uploadProgressPics(`/api/users/progresspics/${cycleId}`, user.token, formData, setFiles)
        closeProgressPics()
    }

    const OpenProgressPics = (e, i)=> {
        setCycleId(i)
        setProgressPics(true)
    }

    const closeProgressPics = ()=> {
        setCycleId('')
        setProgressPics(false)
    }

    const handleModalOpen = (e, type, it)=> {
        setCycle(it)
        const WoId = e.target.value
        asyncFunc.getItem(`/api/workouts/${type}/`, WoId, user.token, setItem).then((data)=> setItem(data))
        setShowPreview(true)
    }

    const handleModalClose = (e)=> {
        setItem({})
        setCycle({})
        setShowPreview(false)
    }

    const markComplete = (e)=> {
        const cycleId = e.target.value
        asyncFunc.updateItem('/api/programs/users/', user.id, {cycleId: cycleId }, user.token, setNewProg)
    }

    useEffect(()=> {
        if(user) {
            dispatch(getExercises(user.token))
            dispatch(getCooldowns(user.token))
            dispatch(getWarmups(user.token))

            asyncFunc.getTodayUser('/api/programs/today/user/', user.id, {date: Date.now()}, user.token, setTodayWorkout )
            .then((data)=> setTodayWorkout(data))

            asyncFunc.getTodayUser('/api/metricsets/today/user/', user.id, {date: Date.now()}, user.token, setTodayMetricSet).then((data)=> setTodayMetricSet(data))

            asyncFunc.getTodayUser('/api/nutritionplans/today/user/', user.id, {date: Date.now()}, user.token, setTodayNP).then((data)=> {
                if(data == null || !data._id) {
                    setTodayNP({})
                } else {
                    setTodayNP(data)
                }
            })
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
                        <button className='weekBtn homeWO' value={item.warmup} onClick={(e, type, it)=>handleModalOpen(e, 'warmup', item)}>{extractData(item.warmup, workouts.warmups)}</button>
                    </div>
                    <div>
                        <span className='titleSpan'>Exercise/s:</span>
                        {item.exercise.map((i, ind)=> <>
                            <button className='weekBtn homeWO' key={ind} value={i} onClick={(e, type, it)=>handleModalOpen(e, 'exercise', item)}>{extractData(i, workouts.exercises)}</button>
                        </>)}  
                    </div>
                    <div>
                        <span className='titleSpan'>CoolDown:</span>
                        <button className='weekBtn homeWO' value={item.cooldown} onClick={(e, type, it)=>handleModalOpen(e, 'cooldown', item)}>{extractData(item.cooldown, workouts.cooldowns)}</button>
                    </div>
                    <div>
                        <button className='weekBtn' onClick={(e)=>OpenProgressPics(e, item._id)}><MdUpload style={{fontSize: '1.5em'}}/></button>
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
                    {(cycle && cycle.notes) && <h3>
                        {item.type === 'warmup' && cycle.notes.wu}
                        {item.type === 'cooldown' && cycle.notes.cd}
                        {item.type === 'exercise' && cycle.notes.ex}
                        </h3>}
                    {item.link && 
                    <div className='vidContainer'> 
                        <iframe width='100%' height='100%' src={asyncFunc.linkVid(item.link)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>       
                    </div>}
                    
                </div>
            </Modal>

            <Modal
                open={progressPics}
                onClose={closeProgressPics}
            >
                <div className="modalDiv previewDiv">
                    <h1>Progress Uploads</h1>
                    <form className='formLogin' style={{alignItem: 'center',}}  method='POST' encType="multipart/form-data" onSubmit={onImgUpload}>
                        <label htmlFor='file' className='weekBtn'><MdUpload style={{fontSize: '1.5em'}}/></label>
                        <input type='file' multiple hidden accept='image/*' name='progressPics' id='file' onChange={onImgChange} />
                        
                        <button type='submit' className='weekBtn' style={{margin: '0 auto'}}>Save</button>
                    </form>
                </div>
            </Modal>
            {todayWorkout.length === 0 && <h1 style={{ textAlign: 'center'}}>No Program Assigned Yet</h1>}
            </div>
            <div className="userMSCont">
            <h4>Today's Metrics</h4>
                {todayMetricSet.length > 0
                     && todayMetricSet.map((item, index)=> <>
                     <h1 key={index}>{item.name}</h1>
                     <button className='weekBtn' value={index} onClick={openMsModal}>Show</button>
                     </>)
                }
                {todayMetricSet.length === 0 && <h1>No Metric Sets Today</h1>}
                <Modal
                open={msModal}
                onClose={closeMsModal}
            >
                <>
                {msItem.name && <div className="modalDiv previewDiv">
                    <h1>Metrics</h1>
                    <h2>{msItem.name}</h2>
                    {msItem.metrics.map((item, index)=> <div key={index} className='viewMS'>
                            <h2>{item.metric}</h2>
                            <p>measured in</p>
                            <h2>{item.unit}</h2> 
                            {msItem.usersAssigned.userAnswers.length === 0 && 
                            <input className='metricSetInput smallInput' placeholder='You' type='number' value={msItem.usersAssigned.userAnswers[index]} onChange={(e)=>handleAnswer(e, index)}/>}
                            {msItem.usersAssigned.userAnswers.length > 0 && <span className='userAnswer'>{msItem.usersAssigned.userAnswers[index]}</span>}
                        </div>)}
                    {msItem.usersAssigned.userAnswers.length === 0 && <button className='weekBtn' value={msItem._id} onClick={submitAnswers} >Submit</button>}
                </div>}
                </>
            </Modal>
            </div>

            <div className="userMSCont">
                <h4>Today's Nutrition Plan</h4>
                {(!todayNP || !todayNP._id) && <h1>No Nutrition Plan Today</h1>}
                {todayNP && todayNP._id
                        && <>
                            <h3>Carbs: {todayNP.plan[day].carb} gm</h3>
                            <h3>Fats: {todayNP.plan[day].fat} gm</h3>
                            <h3>Proteins: {todayNP.plan[day].protein} gm</h3>
                            <h3>Total Calories: {(todayNP.plan[day].protein * 4) + (todayNP.plan[day].carb * 4) + (todayNP.plan[day].fat * 9) }</h3>
                        </>
                }
            </div>
        </div>
    ) 
    }
    
}
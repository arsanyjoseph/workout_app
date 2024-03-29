import {useNavigate, useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './programCreate.css'
import './programView.css'

import {Avatar, Box, Modal} from '@mui/material';

import CircularIndeterminate from '../spinner'
import ComboBox from './autoComplete'
import MaterialUIPickers from '../datePicker/datePicker'

import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import handleErr from '../utils/errorAlert'
import extractData from '../utils/extractData'

import {BsBatteryCharging, BsFillPersonPlusFill} from 'react-icons/bs'
import {IoArrowBackCircle} from 'react-icons/io5'
import { CgMinimize } from 'react-icons/cg'
import {FaRunning} from 'react-icons/fa'
import {MdEditCalendar, MdDeleteForever} from 'react-icons/md'




export default function ProgView () {
    const {id} = useParams()
    const navigate = useNavigate()
    const {user} = useSelector((state)=> state.auth)
    const {users} = useSelector((state)=> state.users)
    const url = '/api/programs/'

    const [program, setProgram] = useState({})
    const [showUsers, setShowUsers] = useState(false)
    const [startDate, setStartDate] = useState(Date.now())
    const [userId, setUserId] = useState(null)
    const [userIdInput, setUserIdInput] = useState('')
    const [err, setErr] = useState(false)


    const handleChange = (e, newVal, setState) => {
        setState(newVal)
    }
    const handleInputChange = (e, newVal, setState) => {
        setState(newVal)
    }

    const handleDateChange = (newVal) => {
        setStartDate(newVal)
    }

    const handleSubmit = () => {
        if(userId === null) {
            handleErr(setErr)
        } else {
            const modifyDate = startDate
            const modifyUserId = userId._id
            const formData = {
                startDate: modifyDate,
                userId: modifyUserId
            }  

            asyncFunc.updateItem(url, id, formData, user.token, setProgram)
            setShowUsers(false)
        }
    }

    const handleDelete = (e)=> {
        e.preventDefault()
        asyncFunc.handleDelete(url, id, user.token)
        navigate('/dashboard/programs/')
    }
    useEffect(()=> {
        if(id) {
            asyncFunc.getItem(url, id, user.token, setProgram).then((data)=> console.log(data))
        }

        return ()=> setProgram({})
    },[])
    if(!program.name) {
      return (
        <CircularIndeterminate />
    )  
    }
    if(program.name) {
     return (
        <div className='newCoolDownContainer progCreate'>
            <h1>{program.name}</h1>
            <div className="buttons">
                    <button className='weekBtn' onClick={()=> navigate('/dashboard/programs') }><IoArrowBackCircle/></button>
                    <button className='weekBtn' onClick={()=> navigate(`/dashboard/programs/${id}/edit`)}><MdEditCalendar/></button>
                    <button className='weekBtn' onClick={()=> setShowUsers(!showUsers)}><BsFillPersonPlusFill/></button>
                    <button className='weekBtn' onClick={handleDelete}><MdDeleteForever/></button>
            </div>

            <Modal
                open={showUsers}
                onClose={()=> setShowUsers(false)}
            >
                <div className='modalDiv'>
                    <h1>Select User</h1>
                    <div className='usersCont'>
                    <ComboBox disableClearable={false} label="Select User" getOptionLabel={(option)=> option.firstName + ' ' + option.lastName} isOptionEqualToValue={(option, value)=> option.firstName === value.firstName} multiple={false} data={users} value={userId} inputValue={userIdInput} handleChange={(e, newVal, setState)=> handleChange(e, newVal, setUserId)} 
                    handleInputChange={(e, newVal, setState)=> handleInputChange(e, newVal, setUserIdInput)} renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <Avatar src={`/${option.avatarLink}`} alt={option.firstName} />
                                <span style={{marginLeft: '0.5em', fontWeight: 'bolder'}}>{option.firstName + ' ' + option.lastName}</span>
                            </Box>
                            )}/>
                    <br/>
                    <MaterialUIPickers label='Start Date' value={startDate} handleChange={handleDateChange} />
                    <button className='weekBtn assignSubmtBtn' onClick={handleSubmit}>Submit</button>
                    </div>
                    {err && <div className='errMessage userAssignErr' >Please, Fill Mandatory Fields</div>}
                </div>
            </Modal>
        
            {program.details.map((item, index)=> <GenerateWeek key={index} weekInd={index} days={item}/>)}
        </div>
    )   
    }
}

function GenerateWeek ({weekInd, days}) {
    return (
        <div className="weekContainer">
            <h3>Week {weekInd +1}</h3>
            <div className="daysContainer">
                {days.map((item, index)=> <GenerateDays key={index} dayCount={(7 * weekInd) + index +1} day={item}/>)}
            </div>
        </div>
    )
}


function GenerateDays ({dayCount, day}) {
    return (
        <div className="dayCont">
            <h4>Day {dayCount}</h4>
            {day.map((item, index)=> <GenerateCycle key={index} cycleIndex={index} cycle={item} /> )}
        </div>
    )
}

function GenerateCycle ({cycleIndex, cycle, handleShowPreview}) {
    const {user} = useSelector((state)=> state.auth)
    const {workouts} = useSelector((state)=> state.workouts)
    const [showCycle, setShowCycle] = useState(true)
    const [showPreview, setShowPreview] = useState(false)
    const [item ,setItem] = useState({})
    const url = '/api/workouts/'
    const handlePreview = (e, type)=> {
        const id = e.target.value
        asyncFunc.getItem(url + `${type}/`, id, user.token, setItem)
        setShowPreview(true)
    }
    const handleModalClose = ()=> {
        setItem({})
        setShowPreview(false)
    }

    return (
        <div className="cycleFormView">

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
            <button className='weekBtn' style={{ float: 'right', fontSize: 'large'}} onClick={()=> setShowCycle(!showCycle)}><CgMinimize/></button>
            {!cycle.isRest && !showCycle && <FaRunning/>}
            {!cycle.isRest && showCycle &&
             <>
             <div>
                 <h5>Warm Up:</h5>
                 <button className='previewBtn' value={cycle.warmup} onClick={(e, type)=> handlePreview(e, 'warmup')}>{extractData(cycle.warmup, workouts.warmups)}</button>
             </div>
             <div>
                 <h5>Exercise:</h5>
                 {(cycle.exercise && cycle.exercise.length > 0) && cycle.exercise.map((item, index)=> {
                        const name = extractData(item, workouts.exercises)
                        return <button className='previewBtn' key={index} value={item} onClick={handlePreview}>{name}</button>
                    })}
             </div>

             <div>
                 <h5>Cool Down:</h5>
                 <button className='previewBtn' value={cycle.cooldown} onClick={handlePreview}>{extractData(cycle.cooldown, workouts.cooldowns)}</button>
             </div>
            </>}
            {cycle.isRest && <>
                {!showCycle && <h4>Rest</h4>}
                <BsBatteryCharging/>
            </> }
        </div>
    )
}
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './cycle.css'
import './programCreate.css'

import CircularIndeterminate from '../spinner'
import ComboBox from './autoComplete'
import MaterialUIPickers from '../datePicker/datePicker'

import handleErr from '../utils/errorAlert'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import extractData from '../utils/extractData'
import {GenerateWeek} from './programCreate2'

import {Modal, Avatar, Box} from '@mui/material'

import {BsBatteryCharging, BsFillPersonPlusFill} from 'react-icons/bs'
import {IoArrowBackCircle} from 'react-icons/io5'
import { CgMinimize } from 'react-icons/cg'
import {FaRunning} from 'react-icons/fa'
import {MdLibraryAdd, MdOutlineDeleteSweep} from 'react-icons/md'
import {AiOutlineSchedule} from 'react-icons/ai'
import {TiDelete} from 'react-icons/ti'




export default function ProgEdit () {
    const {id} = useParams()
    const navigate = useNavigate()
    const {user} = useSelector((state)=> state.auth)
    const {users} = useSelector((state)=> state.users)
    const {workouts} = useSelector((state)=> state.workouts)
    const url = '/api/programs/'

    const [program, setProgram] = useState({})
    const [showUsers, setShowUsers] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const [startDate, setStartDate] = useState(Date.now())
    const [userId, setUserId] = useState(null)
    const [userIdInput, setUserIdInput] = useState('')
    const [err, setErr] = useState(false)

    const [value, setValue] = useState(null)
    const [inputValue, setInputValue] = useState('');

    const cycle = {
        warmup: null,
        cooldown: null,
        exercise: [],
        isRest: true,
        notes: null
    }
    const day = [cycle]
    const week = [day, day, day, day, day, day, day]

    const [prog, setProg] = useState([])

    const addWeekEvent = (e)=> {
        e.preventDefault()
        setProg([...prog, week])
    }

    const removeWeekEvent = (e)=> {
        e.preventDefault()
        const newProg = prog.splice(1-prog.length)
        setProg(newProg)
    }

    const saveProg = (e)=> {
        e.preventDefault()
        if(prog.length === 0) {
            handleErr(setErr)
        } else {
            asyncFunc.updateItem(url, id, {prog: [...prog]}, user.token, setProgram)
            navigate(`/dashboard/programs/${id}`)       
        }
    }
    //View Handle Functions
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

    const deleteWeek = (index)=> {
        const arrItem = program.details.splice(index, 1)
        setProg((prevState)=> ({
            ...prevState,
                details: [...program.details]
        }))
        asyncFunc.updateItem(url, id, {newProgram: program}, user.token, setProgram).then(()=> navigate(`/dashboard/programs/${id}`))
    }
    useEffect(()=> {
        if(id) {
            asyncFunc.getItem(url, id, user.token, setProgram)
        }

        return ()=> {
            setProgram({})
            setProg([])
            setUserId(null)
            setUserIdInput('')
        }
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
                    <button className='weekBtn' onClick={addWeekEvent}><MdLibraryAdd/></button>
                    <button className='weekBtn' onClick={removeWeekEvent}><MdOutlineDeleteSweep/></button>
                    <button className='weekBtn' onClick={()=> setShowUsers(!showUsers)}><BsFillPersonPlusFill/></button>        
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
                                <Avatar src={`/${option.avatarLink}`} alt='m' />
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
            {program.details.map((item, index)=> <GenerateWeekView key={index} weekInd={index} days={item} deleteWeek={(ind)=>deleteWeek(index)}/>)}

            {prog.length > 0 && prog.map((item, index)=>  <GenerateWeek cycle={cycle} setHandleProg={setProg} program={prog} key={index} days={prog[index]} count={index} data={workouts.cooldowns}  value={value} handleChange={(e, val, ind)=>handleChange(e, val, index)} inputValue={inputValue} handleInputChange={handleInputChange} numberWeeks={program.details.length} />)}

            <button className='weekBtn' style={{ width: '100%', fontWeight: 'bolder'}} onClick={saveProg}><AiOutlineSchedule/> Save</button>
            {err && <div className='errMessage' >Please, Add at least One Week</div>}
        </div>
    )   
    }
}

function GenerateWeekView ({weekInd, days, deleteWeek}) {
    return (
        <div className="weekContainer">
            <h3>Week {weekInd +1} <span className='weekBtn' onClick={deleteWeek}><TiDelete/></span></h3>
            <div className="daysContainer">
                {days.map((item, index)=> <GenerateDaysView key={index} dayCount={(7 * weekInd) + index +1} day={item}/>)}
            </div>
        </div>
    )
}

function GenerateDaysView ({dayCount, day}) {
    return (
        <div className="dayCont">
            <h4>Day {dayCount}</h4>
            {day.map((item, index)=> <GenerateCycleView key={index} cycleIndex={index} cycle={item} /> )}
        </div>
    )
}

function GenerateCycleView ({cycleIndex, cycle, handleShowPreview}) {
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
                 {cycle.exercise.map((item, index)=> {
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
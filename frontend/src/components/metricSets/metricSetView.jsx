import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import './metricSetView.css'

import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import searchArray from '../utils/extractName'
import { GenerateForm } from "./metricSetCreate"
import MaterialUIPickers from '../datePicker/datePicker'
import ComboBox from '../programs/autoComplete'

import { MdAddLink } from "react-icons/md"

import { Box, Modal, Avatar } from "@mui/material"
import handleErr from "../utils/errorAlert"



export default function MetricSetView () {
    const {id} = useParams()
    const navigate = useNavigate()
    const {user} = useSelector((state)=> state.auth)
    const {users} = useSelector((state)=> state.users)
    const [metricSet, setMetricSet] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [assignModal, setAssignModal] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userInputValue, setUserInputValue] = useState('')
    const [assignDate, setAssignDate] = useState(Date.now())
    const [err, setErr] = useState(false)
    const url = '/api/metricsets/'
    const metricInfo = {
        metric: '',
        unit: ''
    }
    const handleDateChange = (newVal)=> {
        setAssignDate(newVal)
    }
    const handleChangeUser = (e, newVal, setState) => {
        setState(newVal)
    }
    const handleInputChange = (e, newVal, setState) => {
        setState(newVal)
    }

    const handleAssignUser = ()=> {
        if(userId === null) {
            console.log('no user')
        } else {
            const formData = {
                userId: userId._id,
                date: assignDate
            }
            asyncFunc.updateItem(url, id, {assignData: formData}, user.token, setMetricSet)
            setAssignModal(false)
            setUserId(null)
            setUserInputValue('')
        }
        
        
    }
    const deleteMetricSet = (e)=> {
        e.preventDefault()
        asyncFunc.handleDelete(url, id, user.token)
        setMetricSet({})
        navigate('/dashboard/metricsets')
    }

    const handleSelect = (e, index)=> {
        e.preventDefault()
        let newArr = [...metricSet.metrics]
        newArr[index].unit = e.target.value
        setMetricSet((prevState)=> ({
            ...prevState,
                metrics: [...newArr]
        }))
    }
    const changeName = (e) => {
        e.preventDefault()
        setMetricSet((prevState)=> ({
            ...prevState,
                name: e.target.value
        }))
    }
    const handleChange = (e, index)=> {
        e.preventDefault()
        let newArr = [...metricSet.metrics]
        newArr[index].metric = e.target.value
        setMetricSet((prevState)=> ({
            ...prevState,
                metrics: [...newArr]
        }))
    }

    const removeRow = (e, index) => {
        e.preventDefault()
        let newMetrics = [...metricSet.metrics]
        let removedRow = newMetrics.splice(index, 1)
        setMetricSet((prevState)=> ({
            ...prevState,
                metrics: [...newMetrics]
        }))
    }

    const addMetric = (e)=> {
        e.preventDefault()
        setMetricSet((prevState)=> ({
            ...prevState,
                metrics: [...metricSet.metrics, metricInfo]
        }))
    }
    const handleSave = (e)=> {
        if(metricSet.name.length === 0 || metricSet.metrics.length ===0) {
            handleErr(setErr)
        } else {
        e.preventDefault()
        asyncFunc.updateItem(url, id, {metricSet: metricSet}, user.token, setMetricSet)
        setEditMode(false)
    }}

    const handleBack = (e)=> {
        e.preventDefault()
        setMetricSet({})
        navigate('/dashboard/metricsets')
    }
    useEffect(()=> {
        if(id) {
            asyncFunc.getItem(url, id, user.token, setMetricSet)
        }
    },[])
    if(metricSet.name) {
        return (
            <>
            <h1>Metric Sets</h1>
            <div className='cooldownViewContainer'>
                <div className="buttons">
                    <button className='submitBtn' onClick={handleBack}>Back</button>
                    <button className='submitBtn' onClick={()=> setEditMode(!editMode)}>Edit</button>
                    <button className='submitBtn' onClick={()=> setAssignModal(true)}>Assign</button>
                    <button className='submitBtn' onClick={deleteMetricSet}>Delete</button>
                </div>
                {!editMode && <h1>{metricSet.name}</h1>}
                <div className="metricSetCont">
                {!editMode && <div className="viewModeDiv">
                    {metricSet.metrics.map((item ,index)=> <GenereateMetric key={index} name={item.metric} unit={item.unit} />)}
                    <h2>Assigned Users:</h2>
                    {metricSet.usersAssigned.length > 0 ? metricSet.usersAssigned.map((item, index)=> <button className="weekBtn" key={index} onClick={()=> navigate(`/dashboard/users/${item.userId}`)}>{searchArray(item.userId, users)}</button>) : <h2>No Users Assigned</h2>}
                </div>}
                    <Modal
                        open={assignModal}
                        onClose={()=> setAssignModal(false)}
                    >
                  <div className='modalDiv'>
                    <h1>Select User</h1>
                    <div className='usersCont'>
                    <ComboBox disableClearable={false} label="Select User" getOptionLabel={(option)=> option.firstName + ' ' + option.lastName} isOptionEqualToValue={(option, value)=> option.firstName === value.firstName} multiple={false} data={users} value={userId} inputValue={userInputValue}
                    handleChange={(e, newVal, setState)=> handleChangeUser(e, newVal, setUserId)} 
                    handleInputChange={(e, newVal, setState)=> handleInputChange(e, newVal, setUserInputValue)} renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <Avatar src={`/${option.avatarLink}`} alt={option.firstName} />
                                <span style={{marginLeft: '0.5em', fontWeight: 'bolder'}}>{option.firstName + ' ' + option.lastName}</span>
                            </Box>
                            )}/>
                    <br/>
                    <MaterialUIPickers label='Date' value={assignDate} handleChange={handleDateChange} />
                    <button className='weekBtn assignSubmtBtn' onClick={handleAssignUser}>Submit</button>
                    </div>
                </div>
                    </Modal>
                {editMode &&
                <div className="editModeDiv">
                        <form className='metricSetForm'>
                            <input className="metricSetInput" type='text' name="name" placeholder='** Name' value={metricSet.name} onChange={changeName}/>
                            <h3>Add<span className='weekBtn' style={{marginLeft: '0.5em'}} onClick={addMetric}><MdAddLink/></span></h3>
                        </form>
                     {metricSet.metrics.map((item ,index)=> <GenerateForm key={index} value={item.metric} removeRow={(e)=> removeRow(e, index)} selectValue={item.unit} handleChange={(e, ind)=>handleChange(e,index)} handleSelect={(e, ind)=> handleSelect(e, index)} />)}
                     <button className="weekBtn" onClick={handleSave}>Save</button>
                     {err && <div className='errMessage' >Please, Fill Mandatory Fields</div>}
                </div>}
                </div>
            </div>
            </>
        )
    }
}


function GenereateMetric ({name, unit }) {
    return (
        <div className="metricRow">
            <h2>{name}</h2>
            <p>measured in</p>
            <h2>{unit}</h2>
        </div>
    )
}



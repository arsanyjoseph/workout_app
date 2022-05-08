import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';
import CircularIndeterminate from '../spinner'
import './workoutView.css'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'

import UserAssign from '../userAssign';
import handleErr from '../utils/errorAlert';
import searchArray from '../utils/extractName';

export default function WorkoutView () {
    const {id}= useParams();
    const {user} = useSelector((state)=> state.auth)
    const {users} = useSelector((state)=> state.users)
    const {workouts} = useSelector((state)=> state.workouts)
    const {type} = useParams()
    const woArr = workouts[`${type}s`]

    const url = `/api/workouts/${type}/`

    const [item, setItem] = useState({})
    const [edit, setEdit] = useState(false)
    const [err, setErr] = useState(false)
    const [successDelete, setSuccessDelete] = useState(false)
    const [assignUser, setAssignUser] = useState(false)
    const [selectUser, setSelectUser] = useState({
        userId: null,
        isComplete: false,
        setDate: Date.now(),
    })
    const [message, setMessage] = useState('Please, Select a User')
    const navigate = useNavigate()

    const handleChangeDate = (newValue) => {
        setSelectUser((prevState)=>( {
            ...prevState,
                setDate: newValue
          }))
    };

    //Handle Assign User
    const handleAssign = (e)=> {
        e.preventDefault()
        if(!selectUser.userId || selectUser.userId === '' || selectUser.userId === undefined || !selectUser.setDate || selectUser.setDate === null) {
            handleErr(setErr)
        } else {
            asyncFunc.updateItem(url, id, selectUser, user.token, setItem)
            asyncFunc.getItem(url, id, user.token, setItem)
            setAssignUser(false)
    
        }
    }

    //Select A User
    const defineUser = (e)=> {
        e.preventDefault()
        //Check for a selected user
        if(!e.target.value || e.target.value == null || e.target.value === undefined || e.target.value === '') {
            handleErr(setErr)
        } else {
            setSelectUser((prevState)=>( {
                ...prevState,
                    userId: e.target.value
              }))
        }
    }
    

    const handleBackButton = (e)=> {
        e.preventDefault()
        setAssignUser(false)
    }
    
    //Save input
    const handleChange = (e)=> {
        setItem((prevState)=>( {
          ...prevState,
              [e.target.name]: e.target.value
        }))
    }
  
    //Delete Cool Down
    const deleteCoolDown = (e)=> {
        e.preventDefault()
        asyncFunc.handleDelete(url, id, user.token)
        setSuccessDelete(true)
        setTimeout(()=> {
            setItem({})
            navigate(`/dashboard/${type}`)
        }, 2500)
    }

    //Submit Update
    const handleSubmit = (e)=> {
        e.preventDefault()
        if(item.name === '' || item.link === '') {
            handleErr(setErr)
        }
        asyncFunc.updateItem(url, id, item, user.token, setItem)
        asyncFunc.getItem(url, id, user.token, setItem)
        setEdit(false)
    }


    useEffect(()=> {
        if(id) {
            asyncFunc.getItem(url, id, user.token, setItem)
        }

    },[edit, assignUser, err, selectUser])

    //Assign User Mode
    if(assignUser) {
        return (
            <>
              <UserAssign datePicker={true} value={selectUser.setDate} handleChange={handleChangeDate} submitUser={handleAssign} message= {message} isAssigned={err} handleSelect={defineUser} handleBack={handleBackButton}/>
            </>
        )
    }

    if(!item.name && !item.link) {
        return (
            <div className='takeTime'>
                <CircularIndeterminate/>
            </div>
        )
    }

    //Edit Mode
    if (edit) {
        return (<div className="newCoolDownContainer">
        <div className="formHead">Edit Cool Down</div>
        <div className="formBody">
            <form className="formCoolDown" onSubmit={(e)=> handleSubmit(e)}>
                <input type='text' value={item.name} name="name" placeholder='* Name' onChange={(e)=>handleChange(e)} />
                <input type='text' value={item.link} name="link" placeholder='* Link' onChange={(e)=>handleChange(e)} />
                <textarea type='text' value={item.instruction} name="instruction"  placeholder='Instructions' onChange={(e)=>handleChange(e)} />
                
                <div className="buttons">
                    <button className='submitBtn' onClick={()=>navigate(`/dashboard/${type}`)}>Back</button>
                    <button className='submitBtn' id='submitButton' type="submit">Save</button>
                </div>
            </form>
        </div>
        {err && <div className='errMessage' >Please, Fill Mandatory Fields</div>}
    </div>)
    }

    if (item.link && !edit) {
    return ( 
        <div className='cooldownViewContainer'>
            <div className="buttons">
                <button className='submitBtn' onClick={()=>navigate(`/dashboard/${type}`)}>Back</button>
                <button className='submitBtn' onClick={()=> setEdit(true)}>Edit</button>
                <button className='submitBtn' onClick={(e)=> deleteCoolDown(e)}>Delete</button>
                <button className='submitBtn' onClick={()=> setAssignUser(true)}>Assign</button>
            </div>
            <h1>{item.name}</h1>
            <h2>{item.instruction}</h2>
            <h3>{item.assignedUsersId.length > 0 ? item.assignedUsersId.map((item, index)=> <span key={index + item}>{searchArray(item.userId, users) + ', ' }</span>) : 'No Users Assigned yet'}</h3>
            <div className='vidContainer'> 
                <iframe width='100%' height='100%' src={asyncFunc.linkVid(item.link)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>       
            </div>
            {successDelete && <div style={{marginTop: '1em', padding: '0.7em', width: '90%', borderRadius: '5px', fontSize: '18pt', fontWeight: 'bolder'}} className='errMessage' >Item Deleted Successfully</div>}
        </div>
        )          
}
}









import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CircularIndeterminate from "../spinner"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import handleDate from "../utils/dateHandler"
import searchArray from "../utils/extractName"
import handleErr from "../utils/errorAlert"
import '../workouts/workoutView.css'
import UserAssign from "../userAssign"
import { AiFillDelete } from "react-icons/ai";

export default function UserGroupView () {
    const {id} = useParams()
    const navigate = useNavigate()
    const {user} = useSelector((state)=> state.auth)
    const {users} = useSelector((state)=> state.users)
    const [userGroup, setUserGroup] = useState({})
    const [successDelete, setSuccessDelete] = useState(false)
    const [edit, setEdit] = useState(false)
    const [err, setErr] = useState(false)
    const [assignUser, setAssignUser] = useState(false)
    const [message, setMessage] = useState('')
    const [selectUser, setSelectUser] = useState({
        userId: null,
    })
    

    const url = '/api/usergroups/'

    const handleRemove = (e)=> {
        e.preventDefault()
        const deletedId = e.target.value
        asyncFunc.updateItem(url, id, {deletedId: deletedId}, user.token, setUserGroup)
    }

    //Select A User
    const defineUser = (e)=> {
        e.preventDefault()
        //Check for a selected user
        if(!e.target.value || e.target.value == null || e.target.value === undefined || e.target.value === '') {
            handleErr(setErr)
        } else if (userGroup.usersId.includes(e.target.value)) {
            setMessage('User is Already Assigned')
            handleErr(setErr)
            setTimeout(()=> {
                setMessage('')
            },5000)
        } else {
            setSelectUser((prevState)=>( {
                ...prevState,
                    userId: e.target.value
              }))
        }
    }
    //Assign User
    const submitUser = (e)=> {
        e.preventDefault()
        if(!selectUser.userId || selectUser.userId === '' || selectUser.userId === null) {
            setMessage('Please, Select a User')
            handleErr(setErr)
            setTimeout(()=> {
                setMessage('')
            },5000)
        } else if (userGroup.usersId.includes(selectUser.userId)) {
            setMessage('User is Already Assigned')
            handleErr(setErr)
            setTimeout(()=> {
                setMessage('')
            },5000)
        } else {
            asyncFunc.updateItem(url, id, selectUser, user.token, setUserGroup)
            asyncFunc.getItem(url, id, user.token, setUserGroup)
            setMessage('')
            setAssignUser(false)
        }

    }
    //handle Back button in Assign
    const handleBackButton = (e)=> {
        e.preventDefault()
        setAssignUser(false)
    }

    //Save input
    const handleChange = (e)=> {
        setUserGroup((prevState)=>( {
          ...prevState,
              [e.target.name]: e.target.value
        }))
    }

    //Submit Update
    const handleSubmit = (e)=> {
        e.preventDefault()
        if(userGroup.name === '') {
            handleErr(setErr)
        }
        asyncFunc.updateItem(url, id, userGroup, user.token, setUserGroup)
        asyncFunc.getItem(url, id, user.token, setUserGroup)
        setEdit(false)
    }

    //Delete User Group
    const deleteUserGroup = (e)=> {
        e.preventDefault()
        asyncFunc.handleDelete(url, id, user.token)
        setSuccessDelete(true)
        setTimeout(()=> {
            setUserGroup({})
            navigate('/dashboard/usergroups')
        }, 2500)
    }

    useEffect(()=> {
        if(!id) {
            navigate('/dashboard/usergroups')
        }
        asyncFunc.getItem(url, id, user.token, setUserGroup)
    },[])

    if(!userGroup.name) {
        return <>
            <CircularIndeterminate/>
            <h2>Process is Taking too much time</h2>
        </>
    }

    if(assignUser) {
        return <>
        <UserAssign datePicker={false} submitUser={submitUser} handleSelect={defineUser} handleBack={handleBackButton} isAssigned={err} message={message} />
        </>
    }

    if (edit) {
        return (<div className="newCoolDownContainer">
        <div className="formHead">Edit User Group</div>
        <div className="formBody">
            <form className="formCoolDown" onSubmit={(e)=> handleSubmit(e)}>
                <input type='text' name="name" value={userGroup.name} placeholder='* Name' onChange={(e)=>handleChange(e)} />
                
                <div className="buttons">
                    <button className='submitBtn' onClick={()=>navigate('/dashboard/usergroups')}>Back</button>
                    <button className='submitBtn' id='submitButton' type="submit">Save</button>
                </div>
            </form>
        </div>
        {err && <div className='errMessage' >Please, Fill Mandatory Fields</div>}
    </div>)
    }

    if(userGroup.name && !edit) {
        return ( 
            <div className='cooldownViewContainer'>
                <div className="buttons">
                    <button className='submitBtn' onClick={()=> navigate('/dashboard/usergroups')} >Back</button>
                    <button className='submitBtn' onClick={()=> setEdit(true)}>Edit</button>
                    <button className='submitBtn' onClick={(e)=> deleteUserGroup(e)}>Delete</button>
                    <button className='submitBtn' onClick={()=> setAssignUser(true)}>Assign</button>
                </div>
                <h1>Group Name: {userGroup.name}</h1>
                <h2>Created At: {handleDate(userGroup.createdAt)}</h2>
                <h2>Assigned Users:</h2>
                <div className="usersAssigned">
                    {userGroup.usersId.length > 0 ? userGroup.usersId.map((item, index)=> <span style={{fontWeight: 800, fontSize: '1.5em', color: 'var(--blue'}} key={index + item}>{searchArray(item, users)} <button className="deleteBtn" value={item} onClick={(e)=>handleRemove(e)}><AiFillDelete style={{ pointerEvents: 'none'}}/></button></span>) : <h2>No Users Assigned yet</h2>}
                </div>
                {successDelete && <div style={{marginTop: '1em', padding: '0.7em', width: '90%', borderRadius: '5px', fontSize: '18pt', fontWeight: 'bolder'}} className='errMessage' >Item Deleted Successfully</div>}
            </div>
            )
    }
              

}
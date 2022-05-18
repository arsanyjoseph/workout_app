import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import handleDate from '../utils/dateHandler'
import countries from '../utils/countries'
import memberships from "../utils/memberships"
import CircularIndeterminat from '../spinner'
import './profileView.css'
import ImageAvatars from "../avatar"
import {FcApproval, FcDisapprove} from 'react-icons/fc'
import { MdChangeCircle, MdMoreTime} from 'react-icons/md'
import {Si1Password} from 'react-icons/si'
import {IoArrowBackCircle} from 'react-icons/io5'
import {FaEdit, FaSave} from 'react-icons/fa'
import { Box, Modal, TextField, FormControl, InputLabel, OutlinedInput, MenuItem, InputAdornment } from "@mui/material"
import DownTimer from "../countdownTimer/countdownTimer"


export default function ProfileView () {
    const navigate = useNavigate()
    const locationHook = useLocation()
    const {user} = useSelector((state)=> state.auth)
    const [selectedUser, setSelectedUser] = useState({})
    const [isPending, setIsPending] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [password, setPassword] = useState(false)
    const [passValue, setPassValue] = useState('')
    const [showMember, setShowMember] = useState(false)
    const [membership, setMembership] = useState('')
    const {id} = useParams()
    const url = '/api/users/'
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        location: '',
        height: 0,
        weight: 0,
        phoneNumber: 0,
        age: 0,
    })

    const {firstName, lastName, height, weight, gender, phoneNumber, location, age } = formData
    const switchEditMode = ()=> {
        setFormData({
            firstName: selectedUser.firstName ? selectedUser.firstName : '',
            lastName: selectedUser.lastName ? selectedUser.lastName : '',
            height: selectedUser.height ? selectedUser.height : 0,
            weight: selectedUser.weight ? selectedUser.weight : 0,
            phoneNumber: selectedUser.phoneNumber ? selectedUser.phoneNumber : 0,
            age: selectedUser.age ? selectedUser.age : 0,
            gender: selectedUser.gender ? selectedUser.gender : '',
            location: selectedUser.location ? selectedUser.location : '',
        })
        setEditMode(true)
    }

    const handleInputs = (e, setState)=> {
        setState((prevState)=>({
          ...prevState,
              [e.target.name]: e.target.value
        }))
    }

    const handleApprove = (e)=>{
        e.preventDefault();
        setIsPending(!isPending)
        asyncFunc.updateItem(url, id, {isPending: isPending}, user.token, setSelectedUser)
    }
    const changePass = (e)=> {
        e.preventDefault();
        asyncFunc.updateItem(url, id, {password: passValue}, user.token)
        setPassValue('')
        setPassword(false)
    }
    const handleChangePassword = (e)=> {
        e.preventDefault()
        setPassword(!password)
    }

    const updateProfile = ()=> {
        console.log(formData)
        asyncFunc.updateItem(url, id, formData, user.token, setSelectedUser)
        setEditMode(false)
    }

    const handleBackBtn = (e)=> {
        e.preventDefault()
        if(locationHook.pathname.includes('dashboard')) {
            navigate(`/dashboard/users/${id}`)
        }
        if(locationHook.pathname.includes('home')) {
            navigate(`/home`)
        }
    }

    const changePlan = (e)=> {
        setMembership(e.target.value)
    }

    const savePlan = (e)=> {
        e.preventDefault()
        asyncFunc.updateItem(url, id, {plan: membership}, user.token, setSelectedUser)
        setShowMember(false)
    }

    const addTime = (e)=> {
        e.preventDefault()
        asyncFunc.updateItem(url, id, {extendTime: 2592000000}, user.token, setSelectedUser)
    }
    useEffect(()=> {
        if(!selectedUser.firstName) {
            asyncFunc.getItem(url, id, user.token, setSelectedUser)
        }
    },[])

    if(!selectedUser.firstName) {
        return <CircularIndeterminat />
    }

    return (
        <div className="profileContainer">
            <ImageAvatars imgSrc={'/' + selectedUser.avatarLink} name={selectedUser.firstName} />
            <h1>{selectedUser.firstName + ' ' + selectedUser.lastName}</h1>
            {user.isAdmin && <span className="weekBtn" onClick={addTime}><MdMoreTime style={{fontSize: '1.5em'}}/></span>}
            <DownTimer user={selectedUser} />
            <h2 style={{fontWeight: 800}} className={selectedUser.isPending ? 'suspended' : 'approved'}>
                {user.isAdmin && <span className="suspendApprove" onClick={(e)=> handleApprove(e)}><MdChangeCircle/> </span>}
                {selectedUser.isPending ? <><span>Suspended </span><FcDisapprove/></> 
                    :
                <><span>Approved </span><FcApproval/></>}
                
                </h2>
            <h3>Last Login <span className="userDetails">{handleDate(selectedUser.lastLogin)}</span></h3>
            <h2>Membership: <span className="userDetails">{selectedUser.membership}</span>{user.isAdmin && <span className="weekBtn" onClick={()=> setShowMember(true)}><MdChangeCircle/></span>}</h2>
            <button className="editBtn" onClick={switchEditMode}><FaEdit/> Edit</button>
            <div className="userInfo">
                <h3>E-mail: <span className="userDetails">{selectedUser.email}</span></h3>
                <h3>Age: <span className="userDetails">{selectedUser.age} years </span></h3>
                <h3>Location: <span className="userDetails">{selectedUser.location}</span></h3>
                <h3>Phone Number: <span className="userDetails">{selectedUser.phoneNumber}</span></h3>
                <h3>Weight: <span className="userDetails">{selectedUser.weight} kg</span></h3>
                <h3>Height: <span className="userDetails">{selectedUser.height} cm</span></h3>
                <h3>Gender: <span className="userDetails">{selectedUser.gender}</span></h3>
                <h3>Password: <span className="userDetails">*******  </span><span className="suspendApprove" onClick={(e)=> handleChangePassword(e)}><Si1Password/></span></h3>
            </div>
            <Modal
                open={password}
                onClose={()=> setPassword(false)}
            >
                <div className="modalDiv previewDiv">
                <h1>Password Reset</h1>
                <form onSubmit={(e)=> changePass(e)} className='passwordForm' >
                        <input type='password' value={passValue} autoComplete='new-password' placeholder='New Password' onChange={(e)=> setPassValue(e.target.value)} />
                        <button style={{fontSize: '1.5em'}} className="weekBtn" type="submit"><FaSave/></button>
                </form>
                </div>
            </Modal>
            <Modal
                open={showMember}
                onClose={()=> setShowMember(false)}
            >
                <div className="modalDiv previewDiv">
                <h1>Membership Change</h1>
                <div className="modalBody" style={{height: 'fit-content'}}>
                    <TextField
                            id="outlined-select-plan"
                            select
                            label="Plan"
                            value={membership}
                            type='text'
                            onChange={changePlan}
                            name='membership'
                            >
                                {memberships.map((item, index)=> <MenuItem key={item.name} value={item.name}>{item.name}: {item.price}</MenuItem>)}
                        </TextField>
                    <button className=" editBtn" onClick={savePlan}>Change</button>
                </div>
                </div>
            </Modal>
            <Modal
                open={editMode}
                onClose={()=> setEditMode(false)}
            >
                <div className="modalDiv previewDiv" style={{ width: '90%'}}>
                <h1>Edit Profile</h1>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch', },
                    }}
                    noValidate
                    autoComplete="off"
                    variant='standard'
                    className='registerBox'
                    onChange={(e, setState)=> handleInputs(e, setFormData)}
                    >
                        <TextField
                        id="outlined-firstName-input"
                        label="First Name"
                        type="text"
                        name='firstName'
                        value={firstName}
                        />

                        <TextField
                        id="outlined-lastName-input"
                        label="Last Name"
                        type="text"
                        name='lastName'
                        value={lastName}
                        />
                        
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-age">Age</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-age"
                                    label='age'
                                    type='number'
                                    name='age'
                                    value={age}
                                    onChange={(e, setState)=> handleInputs(e, setFormData)}
                                    />
                        </FormControl>
                        <TextField
                        id="outlined-phoneNumber-input"
                        label="Phone Number"
                        type="number"
                        name='phoneNumber'
                        value={phoneNumber}
                        />
                        
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-weight">Weight</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                    label='weight'
                                    type='number'
                                    name='weight'
                                    value={weight}
                                    onChange={(e, setState)=> handleInputs(e, setFormData)}
                                />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-height">Height</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-height"
                                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                    label='height'
                                    type='number'
                                    name='height'
                                    value={height}
                                    onChange={(e, setState)=> handleInputs(e, setFormData)}
                                />
                        </FormControl>
                        <TextField
                            id="outlined-select-gender"
                            select
                            label="Gender"
                            type='text'
                            name='gender'
                            value={gender}
                            onChange={(e, setState)=> handleInputs(e, setFormData)}
                            >
                                <MenuItem key='male' value='male'>Male</MenuItem>
                                <MenuItem key='female' value='female'>Female</MenuItem>                       
                        </TextField>
                        <br/>
                        <TextField
                            id="outlined-select-location"
                            select
                            label="Location"
                            type='text'
                            name='location'
                            value={location}
                            onChange={(e, setState)=> handleInputs(e, setFormData)}
                            >
                                {countries.map((item, index)=> <MenuItem key={index} value={item.label}>{item.label}</MenuItem>)}
                        </TextField>
                            <br/>
                </Box>
                <button className="weekBtn" style={{float: 'right', fontSize: '2em', margin: '0.5em'}} onClick={updateProfile}><FaSave/></button>
                </div>
            </Modal>
            <div className="buttons">
                <span className="weekBtn" style={{fontSize: '4em'}} onClick={handleBackBtn}><IoArrowBackCircle/></span>
            </div>
        </div>
    )
}
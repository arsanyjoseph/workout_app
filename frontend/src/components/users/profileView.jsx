import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import CircularIndeterminat from '../spinner'
import './profileView.css'
import ImageAvatars from "../avatar"
import {FcApproval, FcDisapprove} from 'react-icons/fc'
import {MdPublishedWithChanges} from 'react-icons/md'
import {Si1Password} from 'react-icons/si'
import {IoArrowBackCircle} from 'react-icons/io5'

export default function ProfileView () {
    const navigate = useNavigate()
    const {user} = useSelector((state)=> state.auth)
    const [selectedUser, setSelectedUser] = useState({})
    const [isPending, setIsPending] = useState(true)
    const [password, setPassword] = useState(false)
    const [passValue, setPassValue] = useState('')
    const {id} = useParams()
    const url = '/api/users/'
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
    useEffect(()=> {
        if(!selectedUser.firstName) {
            asyncFunc.getItem(url, id, user.token, setSelectedUser)
        }

        console.log(selectedUser)
    },[])

    if(!selectedUser.firstName) {
        return <CircularIndeterminat />
    }

    return (
        <div className="profileContainer">
            <ImageAvatars imgSrc={'/' + selectedUser.avatarLink} name={selectedUser.firstName} />
            <h1>{selectedUser.firstName + ' ' + selectedUser.lastName}</h1>
            <h2 style={{fontWeight: 800}} className={selectedUser.isPending ? 'suspended' : 'approved'}><span className="suspendApprove" onClick={(e)=> handleApprove(e)}><MdPublishedWithChanges/> </span>{selectedUser.isPending ? <><span>Suspended </span><FcDisapprove/></> : <><span>Approved </span><FcApproval/></>}</h2>
            <h2>Membership: <span className="userDetails">{selectedUser.membership}</span></h2>
            <div className="userInfo">
                <h3>E-mail: <span className="userDetails">{selectedUser.email}</span></h3>
                <h3>Age: <span className="userDetails">{selectedUser.age} years </span></h3>
                <h3>Location: <span className="userDetails">{selectedUser.location}</span></h3>
                <h3>Phone Numer: <span className="userDetails">{selectedUser.phoneNumber}</span></h3>
                <h3>Gender: <span className="userDetails">{selectedUser.gender}</span></h3>
                <h3>Weight: <span className="userDetails">{selectedUser.weight} kg</span></h3>
                <h3>Height: <span className="userDetails">{selectedUser.height} cm</span></h3>
                <h3>Password: <span className="userDetails">*******  </span><span className="suspendApprove" onClick={(e)=> handleChangePassword(e)}><Si1Password/></span></h3>
            </div>
        
            {password && 
                <form onSubmit={(e)=> changePass(e)} className="formLogin">
                            <input type='password' value={passValue} autoComplete='new-password' placeholder='New Password' onChange={(e)=> setPassValue(e.target.value)} />
                            <button style={{fontSize: '0.75em'}} className="submitBtn" type="submit">Save</button>
                </form>
            }
            
            <div className="buttons">
                <span className="weekBtn" style={{fontSize: '4em'}} onClick={()=> navigate(`/dashboard/users/${id}`)}><IoArrowBackCircle/></span>
            </div>
        </div>
    )
}
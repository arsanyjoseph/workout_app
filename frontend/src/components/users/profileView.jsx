import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import CircularIndeterminat from '../spinner'
import './profileView.css'

export default function ProfileView () {
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
    },[])

    if(!selectedUser.firstName) {
        return <CircularIndeterminat />
    }

    return (
        <div className="profileContainer">
            <h1>{selectedUser.firstName + ' ' + selectedUser.lastName}</h1>
            <h2 style={{fontWeight: 800}} className={selectedUser.isPending ? 'suspended' : 'approved'}>{selectedUser.isPending ? 'Suspended' : 'Approved'}</h2>
            <div className="buttons">
                <button className="submitBtn" onClick={(e)=> handleApprove(e)}>Approve/Suspend</button>
                <button className="submitBtn" onClick={(e)=> handleChangePassword(e)}>Reset Password</button>
            </div>
            {password && <form onSubmit={(e)=> changePass(e)} className="formLogin">
                            <input type='password' value={passValue} autoComplete='new-password' placeholder='New Password' onChange={(e)=> setPassValue(e.target.value)} />
                            <button style={{fontSize: '0.75em'}} className="submitBtn" type="submit">Save</button>
                        </form>}
        </div>
    )
}
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import handleErr from '../utils/errorAlert'

export default function UserGroupCreate () {
    const {user} = useSelector((state)=> state.auth)
    const [name, setName] = useState({
        name: ''
    })
    const navigate = useNavigate()
    const [err, setErr] = useState(false)
    const url = '/api/usergroups/'
    const handleSubmit = (e)=> {
        e.preventDefault()
        if (!name.name || name.name === '') {
            handleErr(setErr)
        } else {
            asyncFunc.createItem(url, name, user.token);
            setName({
                name: ''
            })
            navigate('/dashboard/usergroups')
        }
    }
    return (
        <div className="userGroupContainer">
        <div className="formHead">New User Group</div>
            <div className="formBody">
                <form className="formCoolDown" onSubmit={(e)=> handleSubmit(e)}>
                    <input type='text' name="name" value={name.name} placeholder='* Name' onChange={(e)=> setName({
                        name: e.target.value
                    })}/>
                    <div className="buttons">
                      <button className='submitBtn' onClick={()=> navigate('/dashboard/usergroups')} >Back</button> 
                      <button className='submitBtn' type="submit">Create</button>
                    </div>
                </form>
            </div>
            {err && <div className='errMessage' >Please, Fill Mandatory Fields</div>}
        </div>
    )
}
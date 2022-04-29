import { useEffect, useState } from "react"
import './coolDownCreate.css'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import handleErr from '../utils/errorAlert'

export default function CreateCoolDown () {
    const {user} = useSelector((state)=> state.auth)
    const [formData, setFormData] = useState({
        name: '',
        instruction: '',
        link: '',
        token: user.token,
    })

    const [err, setErr] = useState(false)

    const navigate = useNavigate()
    const [redirect, setRedirect] = useState(false)

    const {name, instruction, link, token} = formData
    const url = '/api/cooldowns/'
    const handleClick = (e)=> {
        e.preventDefault()
        if(name === '' || link === '') {
            handleErr(setErr)
        } else {
        asyncFunc.createItem(url ,formData, token)
        setRedirect(true)
        }
    }

    const handleChange = (e)=> {
        setFormData((prevState)=>( {
          ...prevState,
              [e.target.name]: e.target.value
        }) )
    }


    useEffect(()=> {
        if (redirect) {
            navigate('/dashboard/cooldowns')
        }
    },[redirect, navigate, formData])
    return (
        <div className="newCoolDownContainer">
            <div className="formHead">New Cool Down</div>
            <div className="formBody">
                <form className="formCoolDown" onSubmit={handleClick}>
                    <input type='text' name="name" value={name} placeholder='* Name' onChange={handleChange}/>
                    <input type='text' name="link" value={link} placeholder='* Link' onChange={handleChange}/>
                    <textarea type='text' name="instruction" value={instruction} placeholder='Instructions' onChange={handleChange}/>
                    <div className="buttons">
                      <button className='submitBtn' onClick={()=>setRedirect(true)}>Back</button> 
                      <button className='submitBtn' type="submit">Create</button>
                    </div>
                </form>
            </div>
            {err && <div className='errMessage' >Please, Fill Mandatory Fields</div>}
        </div>
    )
}
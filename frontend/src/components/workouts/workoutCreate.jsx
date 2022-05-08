import { useEffect, useState } from "react"
import './workoutCreate.css'
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import handleErr from '../utils/errorAlert'
import handleName from "../utils/handleTypeName"

export default function WorkoutCreate () {
    const {user} = useSelector((state)=> state.auth)
    const {type} = useParams()
    const url = `/api/workouts/${type}`

    const [formData, setFormData] = useState({
        type: type,
        name: '',
        instruction: '',
        link: '',
        token: user.token,
    })

    const [err, setErr] = useState(false)

    const navigate = useNavigate()
    const [redirect, setRedirect] = useState(false)

    const {name, instruction, link, token} = formData

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
            navigate(`/dashboard/${type}`)
        }
    },[redirect, navigate, formData])
    return (
        <div className="newCoolDownContainer">
            <div className="formHead">New {handleName(type)}</div>
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
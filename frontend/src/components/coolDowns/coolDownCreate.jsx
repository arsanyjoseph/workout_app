import { useEffect, useState } from "react"
import './coolDownCreate.css'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import coolDown from "../utils/asyncFuncs/asyncCoolDown"

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

    const handleClick = (e)=> {
        e.preventDefault()
        if(name === '' || link === '') {
            handleErr()
        } else {
        coolDown.createCoolDown(formData, token)
        setRedirect(true)
        }
    }

    const handleChange = (e)=> {
        setFormData((prevState)=>( {
          ...prevState,
              [e.target.name]: e.target.value
        }) )
    }

    const handleErr = ()=> {
        setErr(true)
        setTimeout(() => {
            setErr(false)
        }, 5000);
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
                      <button onClick={()=>setRedirect(true)}>Back</button> 
                      <button type="submit">Create</button>
                    </div>
                </form>
            </div>
            {err && <div className='errMessage' >Please Fill Mandatory Fields</div>}
        </div>
    )
}
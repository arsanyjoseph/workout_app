import { useEffect, useState } from "react"
import './coolDownCreate.css'
import axios from "axios"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function CreateCoolDown () {
    const {user} = useSelector((state)=> state.auth)
    const [formData, setFormData] = useState({
        name: '',
        instruction: '',
        link: '',
        token: user.token
    })

    const navigate = useNavigate()
    const [redirect, setRedirect] = useState(false)

    const {name, instruction, link, token} = formData

    const handleClick = (e)=> {
        e.preventDefault()
        createCoolDown(formData, token)
        setRedirect(true)
    }

    const handleChange = (e)=> {
        setFormData((prevState)=>( {
          ...prevState,
              [e.target.name]: e.target.value
        }) )
    }

    const createCoolDown = async (formData, token)=> {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post('/api/cooldowns/', formData, config)
        console.log(response.data)
        return response.data
    }

    useEffect(()=> {
        if (redirect) {
            navigate('/dashboard/cooldown')
        }
    },[redirect, navigate])
    return (
        <div className="newCoolDownContainer">
            <div className="formHead">New Cool Down</div>
            <div className="formBody">
                <form className="formCoolDown" onSubmit={handleClick}>
                    <input type='text' name="name" value={name} placeholder='Cool Down Name' onChange={handleChange}/>
                    <input type='text' name="link" value={link} placeholder='Cool Down Link' onChange={handleChange}/>
                    <textarea type='text' name="instruction" value={instruction} placeholder='Cool Down Instructions' onChange={handleChange}/>
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}
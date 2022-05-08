import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import handleErr from "../utils/errorAlert"

export default function LibraryCreate () {
    const {user} = useSelector((state)=> state.auth)
    const [err, setErr] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        link: '',
        token: user.token,
    })
    const url = '/api/videos/'
    const {name, description, link, token} = formData

    const handleChange = (e)=> {
        setFormData((prevState)=>( {
          ...prevState,
              [e.target.name]: e.target.value
        }) )
    }

    const handleClick = (e)=> {
        e.preventDefault()
        if(name === '' || link === '') {
            handleErr(setErr)
        } else {
        asyncFunc.createItem(url ,formData, token)
        setRedirect(true)
        }
    }

    useEffect(()=> {
        if(redirect) {
            navigate('/dashboard/library')
        }
    },[formData, navigate, redirect])
    return (
        <div className="newCoolDownContainer">
            <div className="formHead">New Library Item</div>
            <div className="formBody">
            <form className="formCoolDown" onSubmit={handleClick}>
                    <input type='text' name="name" placeholder='* Name' value={name} onChange={handleChange} />
                    <input type='text' name="link" placeholder='* Link' value={link} onChange={handleChange} />
                    <textarea type='text' name="description" placeholder='Description' value={description} onChange={handleChange}/>
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
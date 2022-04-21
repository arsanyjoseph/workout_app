import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios'
import Spinner from '../spinner'
import './coolDownView.css'
import coolDownAsyncFunc from '../utils/asyncFuncs/asyncCoolDown'
import NoMatch from '../nomatch/nomatch';

export default function CoolDownView () {
    const {id}= useParams();
    const {user} = useSelector((state)=> state.auth)
    const [selectedCoolDown, setSelectedCoolDown] = useState({})
    const [edit, setEdit] = useState(false)
    const [err, setErr] = useState(false)
    const navigate = useNavigate()


    const handleChange = (e)=> {
        setSelectedCoolDown((prevState)=>( {
          ...prevState,
              [e.target.name]: e.target.value
        }) )
        console.log(selectedCoolDown)
    }

    const handleErr = ()=> {
        setErr(true)
        setTimeout(() => {
            setErr(false)
        }, 5000);
    }


    const handleClick = (e)=> {
        e.preventDefault()
        if(selectedCoolDown.name === '' || selectedCoolDown.link === '') {
            handleErr()
        }
    }


    const getCoolDown = async (id, token)=> {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get('/api/cooldowns/' + id, config)
        console.log(response.data)
        setSelectedCoolDown(response.data)
        return response.data
    }
    
    useEffect(()=> {
        getCoolDown(id, user.token)
    },[])

    if(!selectedCoolDown.link) {
        return (
            <div className='takeTime'>
                <h2>Page is Taking Too Much Time to Respond</h2>
                <h3>The Page you are requesting may be Not Found</h3>
                <Spinner/>
            </div>
        )
    }

    if (edit) {
        return (<div className="newCoolDownContainer">
        <div className="formHead">Edit Cool Down</div>
        <div className="formBody">
            <form className="formCoolDown">
                <input type='text' value={selectedCoolDown.name} name="name" placeholder='* Name' onChange={(e)=>handleChange(e)} />
                <input type='text' value={selectedCoolDown.link} name="link" placeholder='* Link' onChange={handleChange} />
                <textarea type='text' value={selectedCoolDown.instruction} name="instruction"  placeholder='Instructions' onChange={handleChange} />
                <div className="buttons">
                  <button >Back</button> 
                  <button type="submit" onClick={(e)=> handleClick(e)}>Save</button>
                </div>
            </form>
        </div>
        {err && <div className='errMessage' >Please Fill Mandatory Fields</div>}
    </div>)
    }

    if (selectedCoolDown.link) {
    return ( 
        <div className='cooldownViewContainer'>
            <div className="buttons">
                <button onClick={()=>navigate('/dashboard/cooldowns')}>Back</button>
                <button onClick={()=> setEdit(true)}>Edit</button>
            </div>
            <h1>{selectedCoolDown.name}</h1>
            <h2>{selectedCoolDown.instruction}</h2>
            <div className='vidContainer'> 
                <iframe width='100%' height='100%' src={coolDownAsyncFunc.linkVid(selectedCoolDown.link)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>       
            </div>
        </div>
        )          
}
}









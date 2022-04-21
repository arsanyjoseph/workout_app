import { memo, useEffect, useState} from 'react'
import './coolDownList.css'
import axios from 'axios'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Spinner from '../spinner'
import Table from '../table'




export default function CoolDownList () {
    const [coolDowns, setCoolDowns] = useState([])
    const {user} = useSelector((state)=> state.auth)
    
    const navigate = useNavigate()
    //Get All CoolDown List
    const getCoolDowns = async (token)=> {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get('/api/cooldowns/', config)
        console.log(response.data)
        setCoolDowns(response.data)
        return response.data
    }

    useEffect(()=> {
        if(!user.token) {
            navigate('/')
        }
       getCoolDowns(user.token)
    },[])

    if(coolDowns.length === 0) {
        return <Spinner/>
    }
    
    if(coolDowns.length > 0){
     return (
        <div className="coolDownListContainer">
            <a href='/dashboard/cooldowns/new'>Create</a>
            <Table data={coolDowns}/>
        </div>
    )   
    }
    
}


import { useEffect, useState} from 'react'
import './coolDownList.css'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Spinner from '../spinner'
import Table from './table'
import coolDownAsyncFunc from '../utils/asyncFuncs/asyncCoolDown'

export default function CoolDownList () {
    const [coolDowns, setCoolDowns] = useState([])
    const {user} = useSelector((state)=> state.auth)
    
    const navigate = useNavigate()

    useEffect(()=> {
        if(!user.token) {
            navigate('/')
        }
        coolDownAsyncFunc.getCoolDowns(user.token, setCoolDowns)
    },[])

    if(coolDowns.length === 0) {
        return (
        <div className="coolDownListContainer">
            <Spinner/>
            <div className='buttons' style={{justifyContent: 'center', marginTop: '1em'}}>
                <button onClick={()=>navigate('/dashboard/cooldowns/new')}>New</button>
            </div>
            <h1 >No Cool Downs Found</h1>
        </div>
        )
    }
    
    if(coolDowns.length > 0){
     return (
        <div className="coolDownListContainer">
            <div className='buttons' style={{justifyContent: 'center', marginBottom: '1em'}}>
                <button onClick={()=>navigate('/dashboard/cooldowns/new')}>New</button>
            </div>
            <Table data={coolDowns}/>
        </div>
    )   
    }
    
}


import { useEffect, useState} from 'react'
import './workoutList.css'
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Spinner from '../spinner'
import Table from './table'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import handleName from '../utils/handleTypeName'

export default function WorkoutList () {
    const [items, setItems] = useState([])
    const [message, setMessage] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {user} = useSelector((state)=> state.auth)
    const {type} = useParams()
    const url = `/api/workouts/${type}`
    const navigate = useNavigate()
    const workoutTypes = ['exercise', 'warmup', 'cooldown']

    const handleNewBtn = (e) => {
        e.preventDefault();
        setRedirect(false)
        navigate(`/dashboard/${type}/new`)
    }

    useEffect(()=> {
        if(!user.token) {
            navigate('/')
        }
        if (!workoutTypes.includes(type)) {
            setMessage('Error getting Items !!!')
            setTimeout(()=> navigate('/notfound'), 3000)
        }

        asyncFunc.getItems(url, user.token, setItems)
        return ()=> setMessage('')
    },[message, type, redirect, items])

    if(items.length === 0) {
        return (
            <>
                <h1 style={{fontWeight: 800}}>{handleName(type)}</h1>
                <div className="coolDownListContainer">
                    <Spinner/>
                    <div className='buttons' style={{justifyContent: 'center', marginTop: '1em'}}>
                        <button className='submitBtn' onClick={(e)=> handleNewBtn(e)}>New</button>
                    </div>
                    <h1>No Items Found</h1>
                </div>
            </>
        )
    }
    
    if(items.length > 0){
     return (
         <>
         <h1>{handleName(type)}</h1>
        <div className="coolDownListContainer">
            <div className='buttons' style={{justifyContent: 'center', marginBottom: '1em'}}>
                <button className='submitBtn' onClick={()=>navigate(`/dashboard/${type}/new`)}>New</button>
            </div>
            <Table data={items}/>
        </div>
        </>
    )   
    }
    
}


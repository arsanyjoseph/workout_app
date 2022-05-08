import { useEffect, useState} from 'react'
import './workoutList.css'
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CircularIndeterminate from '../spinner'
import Table from './table'
import handleName from '../utils/handleTypeName'

export default function WorkoutList () {
    const {workouts} = useSelector((state)=> state.workouts)
    const [message, setMessage] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {user} = useSelector((state)=> state.auth)
    const {type} = useParams()
    const navigate = useNavigate()
    const workoutTypes = ['exercise', 'warmup', 'cooldown']
    const woArr = workouts[`${type}s`]

    const handleNewBtn = (e) => {
        e.preventDefault();
        setRedirect(false)
        navigate(`/dashboard/${type}/new`)
    }

    useEffect(()=> {
        if(!user.token) {
            navigate('/')
        }
        if (workoutTypes.includes(type) === false) {
            navigate('/notfound')
        }
        return ()=> setMessage('')
    },[message, type, redirect])

    if(woArr && woArr.length === 0) {
        return (
            <>
                <h1 style={{fontWeight: 800}}>{handleName(type)}</h1>
                <div className="coolDownListContainer">
                    <CircularIndeterminate/>
                    <div className='buttons' style={{justifyContent: 'center', marginTop: '1em'}}>
                        <button className='submitBtn' onClick={(e)=> handleNewBtn(e)}>New</button>
                    </div>
                    <h1>No Items Found</h1>
                </div>
            </>
        )
    }
    
    if(woArr.length > 0){
     return (
         <>
         <h1>{handleName(type)}</h1>
        <div className="coolDownListContainer">
            <div className='buttons' style={{justifyContent: 'center', marginBottom: '1em'}}>
                <button className='submitBtn' onClick={()=>navigate(`/dashboard/${type}/new`)}>New</button>
            </div>
            <Table data={woArr}/>
        </div>
        </>
    )   
    }
    
}


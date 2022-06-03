import { useEffect, useState} from 'react'
import './workoutList.css'
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CircularIndeterminate from '../spinner'
import Table from './table'
import handleName from '../utils/handleTypeName'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import ComboBox from '../programs/autoComplete'

export default function WorkoutList () {
    const {workouts} = useSelector((state)=> state.workouts)
    const [message, setMessage] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {user} = useSelector((state)=> state.auth)
    const {type} = useParams()
    const navigate = useNavigate()
    const [item, setItem] = useState(null)
    const [itemInput, setItemInput] = useState('')
    const workoutTypes = ['exercise', 'warmup', 'cooldown']
    
    const [woArr, setWoArr] = useState([])
    const handleNewBtn = (e) => {
        e.preventDefault();
        setRedirect(false)
        navigate(`/dashboard/${type}/new`)
    }
    const handleChange = (e, newVal, setState) => {
        setState(newVal)
 }

 const handleInputChange = (e, newVal, setState) => {
     setState(newVal)
 }
    useEffect(()=> {
        if(!user.token) {
            navigate('/')
        }
        if (workoutTypes.includes(type) === false) {
            navigate('/notfound')
        }
        asyncFunc.getItems(`/api/workouts/${type}` , user.token, setWoArr)

        if(item !== null) {
            navigate(`/dashboard/${type}/${item._id}`)
            setItem(null)
            setItemInput('')
        }
        return ()=> setMessage('')
    },[message, type, redirect, item])

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
            <ComboBox disableClearable={false} label={`${type}`} size='large' getOptionLabel={(option)=> option.name} isOptionEqualToValue={(option, value)=> option.name === value.name} multiple={false} data={woArr} value={item} inputValue={itemInput} handleChange={(e, newVal, setState)=> handleChange(e, newVal, setItem)} handleInputChange={(e, newVal, setState)=> handleInputChange(e, newVal, setItemInput)}/>
            <Table data={woArr}/>
        </div>
        </>
    )   
    }
    
}


import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ProgramTable from "./programTable"
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import { useSelector } from "react-redux"
import CircularIndeterminate from '../spinner'
import ComboBox from "./autoComplete"
import './programList.css'

export default function ProgramList () {
    const {user} = useSelector((state)=> state.auth)
    const url = '/api/programs/'
    const navigate = useNavigate()
    const [progs, setProgs] = useState([])
    const [item, setItem] = useState(null)
    const [itemInput, setItemInput] = useState('')

    const handleChange = (e, newVal, setState) => {
        setState(newVal)
    }

    const handleInputChange = (e, newVal, setState) => {
        setState(newVal)
    }
    useEffect(()=> {
        asyncFunc.getItems(url, user.token, setProgs)
        if(item !== null) {
            navigate(`/dashboard/programs/${item._id}`)
            setItem(null)
            setItemInput('')
        }
    },[item])

    if (progs.length === 0) {
        return (
            <>
        <h1>Programs</h1>
       <div className="coolDownListContainer">
           <div className='buttons' style={{justifyContent: 'center', marginBottom: '1em'}}>
               <button className='submitBtn' onClick={()=>navigate(`/dashboard/programs/new`)}>New</button>
           </div>
           <CircularIndeterminate />

       </div>
       </>
        )
    }
    return (
        <>
        <h1>Programs</h1>
       <div className="coolDownListContainer">
           <div className='buttons' style={{justifyContent: 'center', marginBottom: '1em'}}>
               <button className='submitBtn' onClick={()=>navigate(`/dashboard/programs/new`)}>New</button>
           </div>
           <ComboBox disableClearable={false} label='Programs' size='large' getOptionLabel={(option)=> option.name} isOptionEqualToValue={(option, value)=> option.name === value.name} multiple={false} data={progs} value={item} inputValue={itemInput} handleChange={(e, newVal, setState)=> handleChange(e, newVal, setItem)} handleInputChange={(e, newVal, setState)=> handleInputChange(e, newVal, setItemInput)}/>
           <ProgramTable data={progs} />
       </div>
       </>
   )   
}
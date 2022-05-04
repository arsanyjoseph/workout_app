import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ProgramTable from "./programTable"
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import { useSelector } from "react-redux"
import CircularIndeterminate from '../spinner'

export default function ProgramList () {
    const {user} = useSelector((state)=> state.auth)
    const url = '/api/programs/'
    const navigate = useNavigate()
    const [progs, setProgs] = useState([])

    useEffect(()=> {
        asyncFunc.getItems(url, user.token, setProgs)
    },[])

    if (progs.length === 0) {
        return (
            <CircularIndeterminate />
        )
    }
    return (
        <>
        <h1>Programs</h1>
       <div className="coolDownListContainer">
           <div className='buttons' style={{justifyContent: 'center', marginBottom: '1em'}}>
               <button className='submitBtn' onClick={()=>navigate(`/dashboard/programs/new`)}>New</button>
           </div>
           <ProgramTable data={progs} />
       </div>
       </>
   )   
}
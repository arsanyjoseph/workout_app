import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import MetricSetTable from "./metricSetsTable"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"

export default function MetricSets () {
    const {user} = useSelector((state)=> state.auth)
    const navigate = useNavigate()
    const url = '/api/metricsets'
    const [metricSets, setMetricSets] = useState([])
    useEffect(()=> {
        if(user) {
            asyncFunc.getItems(url, user.token, setMetricSets)
        }
    },[metricSets])

    if(metricSets.length > 0) {
    return (
        <>
            <h1>Metric Sets</h1>
            <div className="coolDownListContainer">
                <div className='buttons' style={{justifyContent: 'center', marginBottom: '1em'}}>
                    <button className='submitBtn' onClick={()=>navigate('/dashboard/metricsets/new')}>New</button>
                </div>
                <MetricSetTable data={metricSets}/>
            </div>  
        </>
    ) 
    }
    
}
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"

export default function MetricSets () {
    const {user} = useSelector((state)=> state.auth)
    const url = '/api/metricsets'
    const [metricSets, setMetricSets] = useState([])
    useEffect(()=> {
        if(user) {
            asyncFunc.getItems(url, user.token, setMetricSets)
        }
    },[metricSets])

    if(metricSets.length > 0) {
    return (
        <div>
            {metricSets.map((item, index)=> <h1>{item.name}</h1>)}
        </div>
    ) 
    }
    
}
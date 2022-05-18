import './metricSetCreate.css'
import units from '../utils/units'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {MdAddLink} from 'react-icons/md'
import {IoArrowBackCircle, IoSaveSharp} from 'react-icons/io5'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import { useNavigate } from 'react-router-dom'

export default function MetricSetCreate () {
    const {user} = useSelector((state)=> state.auth)
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [metrics, setMetrics] = useState([])
    const metricInfo = {
        metric: '',
        unit: ''
    }
    const url = '/api/metricsets/'
    const handleName = (e)=> {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleChange = (e, index)=> {
        e.preventDefault()
        let newArr = [...metrics]
        newArr[index].metric = e.target.value
        setMetrics(newArr)
    }

    const handleSelect = (e, index)=> {
        e.preventDefault()
        let newArr = [...metrics]
        newArr[index].unit = e.target.value
        setMetrics(newArr)
    }

    const handleSave = (e)=> {
        e.preventDefault()
        const data = {
            name: name,
            metrics: metrics
        }
        if(name.length > 0 && metrics.length > 0) {
            asyncFunc.createItem(url, data, user.token)
        }
        setMetrics([])
        setName('')
        navigate('/dashboard/metricsets/')
    }

    const addMetric = (e,)=> {
        e.preventDefault()
        setMetrics([...metrics, metricInfo])
    }

    return (
        <div className="userGroupContainer" style={{width: '75%'}}>
        <div className="formHead">New Metric Set</div>
            <div className="formBody">
                <form className='metricSetForm'>
                    <input className="metricSetInput" type='text' name="name" placeholder='** Name' value={name} onChange={handleName}/>
                    <h3>Details<span className='weekBtn' style={{marginLeft: '0.5em'}} onClick={addMetric}><MdAddLink/></span></h3>
                    {metrics.length > 0 && metrics.map((item, index)=> <GenerateForm key={index} value={metrics[index].metric} handleChange={(e, ind)=>handleChange(e,index)} handleSelect={(e, ind)=> handleSelect(e, index)}/>)}
                    <div className="buttons">
                      <button className='weekBtn'><IoArrowBackCircle/></button> 
                      <button className='weekBtn' type="submit" onClick={handleSave}><IoSaveSharp/></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function GenerateForm ({value, handleChange, handleSelect}) {
    return (
        <div className="metricsContainer">
            <input className="metricSetInput" type='text' name="key" placeholder="Specify Metric" value={value} onChange={handleChange}/>


            <select name='unit' onChange={handleSelect}>
                <option disabled selected>Unit</option>
                {units.map((item, index)=> <option key={index} value={item}>{item}</option>)}
            </select>
        </div>
    )
}
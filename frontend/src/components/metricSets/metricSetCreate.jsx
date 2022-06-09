import './metricSetCreate.css'
import units from '../utils/units'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {MdAddLink, MdOutlineRemoveCircle} from 'react-icons/md'
import {IoArrowBackCircle, IoSaveSharp} from 'react-icons/io5'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import handleErr from '../utils/errorAlert'
import { useNavigate } from 'react-router-dom'

export default function MetricSetCreate () {
    const {user} = useSelector((state)=> state.auth)
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [metrics, setMetrics] = useState([])
    const [err, setErr] = useState(false)
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
        const metricSet = {
            name: name,
            metrics: metrics
        }
        if(name.length === 0 || metrics.length === 0) {
            handleErr(setErr)
        } else {
            asyncFunc.createItem(url, {metricSet: metricSet}, user.token)
            setMetrics([])
            setName('')
            navigate('/dashboard/metricsets/')
        }
    }

    const removeRow = (e, index) => {
        e.preventDefault()
        let newMetrics = [...metrics]
        let removedRow = newMetrics.splice(index, 1)
        setMetrics(newMetrics)
    }
    const addMetric = (e)=> {
        e.preventDefault()
        setMetrics([...metrics, metricInfo])
    }

    return (
        <div className="userGroupContainer" style={{width: '75%'}}>
        <div className="formHead">New Metric Set</div>
            <div className="formBody">
                <form className='metricSetForm'>
                    <input className="metricSetInput" type='text' name="name" placeholder='** Name' value={name} onChange={handleName}/>
                    <h3>Add<span className='weekBtn' style={{marginLeft: '0.5em'}} onClick={addMetric}><MdAddLink/></span></h3>
a
                    {metrics.length > 0 && metrics.map((item, index)=> <GenerateForm key={index} value={item.metric} removeRow={(e)=> removeRow(e, index)} handleChange={(e, ind)=>handleChange(e,index)} handleSelect={(e, ind)=> handleSelect(e, index)}/>)}
                    <div className="buttons">
                      <button className='weekBtn' onClick={()=> navigate('/dashboard/metricsets')}><IoArrowBackCircle/></button> 
                      <button className='weekBtn' type="submit" onClick={handleSave}><IoSaveSharp/></button>
                    </div>
                </form>
            </div>
            {err && <div className='errMessage' >Please, Fill Mandatory Fields</div>}
        </div>
    )
}

export function GenerateForm ({value, handleChange, handleSelect, removeRow, selectValue}) {
    return (
        <div className="metricsContainer">
            <input className="metricSetInput" type='text' name="key" placeholder="Specify Metric" value={value} onChange={handleChange}/>

            <select name='unit'value={selectValue} onChange={handleSelect}>
                <option disabled selected>Unit</option>
                {units.map((item, index)=> <option key={index} value={item}>{item}</option>)}
            </select>
            <span onClick={removeRow}><MdOutlineRemoveCircle/></span>
        </div>
    )
}
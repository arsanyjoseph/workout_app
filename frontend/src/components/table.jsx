import handleDate from './utils/dateHandler'
import { useSelector } from "react-redux"
import searchArray from './utils/extractName' 
import { useEffect } from 'react'
import './table.css'
import { useNavigate } from 'react-router-dom'

export default function Table (props) {
    return (
        <div className='tableContainer'>
            <table>
                <thead>
                    <tr>
                        <th className='tableHead'>Name</th>
                        <th className='tableHead'>Created By</th>
                        <th className='tableHead'>Created At</th>   
                        <th className='tableHead'>Assigned Users</th>   
                    </tr>
                </thead>
                <tbody>
                    {GenerateTR(props.data)}
                </tbody>
            </table>
        </div>
    )
}

function GenerateTR (data) {
    const {users} = useSelector((state)=> state.users)
    const navigate = useNavigate()

    const handleClick = (e)=> {
        e.preventDefault()
        navigate(`${e.target.value}`)
    }

    useEffect(()=> {
      
    })
    return (
        <>
        {data.map((item, index)=> {
            const creationDate = handleDate(item.createdAt)
            const idName = searchArray(item._id, users)
            return (
          <tr className='tableData' key={index}>
            <td><button className='names' onClick={handleClick} value={item._id}>{item.name}</button></td>
            <td>{idName}</td>
            <td>{creationDate}</td>
            <td>{creationDate}</td>
        </tr>
            )  
        })}
        </>
)
}
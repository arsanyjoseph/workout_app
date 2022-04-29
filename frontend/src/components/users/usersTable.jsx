import handleDate from '../utils/dateHandler'
import { useSelector } from "react-redux"
import searchArray from '../utils/extractName' 
import '../coolDowns/table.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function UsersTable ({data}) {
    return (
        <div className='tableContainer'>
            <table>
                <thead>
                    <tr>
                        <th className='tableHead'>Name</th>
                        <th className='tableHead'>Joined</th>
                        <th className='tableHead'>User Group</th>   
                        <th className='tableHead'>Details</th>   
                    </tr>
                </thead>
                <tbody>
                    {GenerateTR(data)}
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
    
    if(users.length > 0) {
            return (
            <>
            {data.map((item, index)=> {
                const creationDate = handleDate(item.createdAt)
                return (
            <tr className='tableData' key={index}>
                <td><button className='names' onClick={handleClick} value={item._id}>{item.firstName + ' ' + item.lastName}</button></td>
                <td>{creationDate}</td>
                <td>User Groups</td>
                <td className='assignedUsers'>placeholder</td>
            </tr>
                )  
            })}
            </>
    )  
    }
    
}
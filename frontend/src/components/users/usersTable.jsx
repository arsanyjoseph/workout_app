import handleDate from '../utils/dateHandler'
import { useSelector } from "react-redux"
import '../workouts/table.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import GroupsList from './groupsList'

export default function UsersTable ({data}) {
    return (
        <div className='tableContainer'>
            <table>
                <thead>
                    <tr>
                        <th className='tableHead'>Name</th>
                        <th className='tableHead'>Last Login</th>
                        <th className='tableHead'>User Groups</th>   
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
    const {user} = useSelector((state)=> state.auth)
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
                const lastLoginDate = handleDate(item.lastLogin)
                return (
            <tr className='tableData' key={index}>
                <td><button className='names' onClick={handleClick} value={item._id}>{item.firstName + ' ' + item.lastName}</button></td>
                <td>{lastLoginDate}</td>
                <td><GroupsList token={user.token} url='/api/usergroups/groups' id={{id: item._id}} /></td>
                <td className='assignedUsers'></td>
            </tr>
                )  
            })}
            </>
    )  
    }
    
}
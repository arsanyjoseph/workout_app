import handleDate from '../utils/dateHandler'
import { useSelector } from "react-redux"
import searchArray from '../utils/extractName' 
import './table.css'
import { useNavigate } from 'react-router-dom'

export default function Table ({data}) {
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
                const idName = searchArray(item.createdById, users)
                return (
            <tr className='tableData' key={index}>
                <td><button className='names' onClick={handleClick} value={item._id}>{item.name}</button></td>
                <td>{idName}</td>
                <td>{creationDate}</td>
                <td className='assignedUsers'>{item.assignedUsersId.length > 0 ? item.assignedUsersId.map((i, index)=> <span key={index + i.userId}>{searchArray(i.userId, users) + ', '}</span> ) : 'No Users Assigned Yet'}</td>
            </tr>
                )  
            })}
            </>
    )  
    }
    
}
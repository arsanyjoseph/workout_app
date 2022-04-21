import handleDate from './utils/dateHandler'
import { useSelector } from "react-redux"
import searchArray from './utils/extractName' 
import { useEffect } from 'react'

export default function Table (props) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created By</th>
                        <th>Created At</th>   
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

    const handleClick = (e)=> {
        e.preventDefault()
        console.log(e.target.value)
    }

    useEffect(()=> {
      
    })
    return (
        <>
        {data.map((item, index)=> {
            const creationDate = handleDate(item.createdAt)
            const idName = searchArray(item._id, users)
            return (
          <tr key={index}>
            <td><button onClick={handleClick} value={item._id}>{item.name}</button></td>
            <td>{idName}</td>
            <td>{creationDate}</td>
        </tr>
            )  
        })}
        </>
)
}
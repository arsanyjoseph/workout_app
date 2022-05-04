import UsersTable from './usersTable'
import { useSelector } from "react-redux"


export default function Users () {
    const {users} = useSelector((state)=> state.users)
    return(    
        <>
          <h1>Users</h1>
          <div className='usersContainer'>
            <UsersTable data={users}/>
          </div>
        </>  
    )
}
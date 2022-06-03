import UsersTable from './usersTable'
import { useSelector } from "react-redux"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ComboBox from '../programs/autoComplete'
import { Avatar, Box } from '@mui/material'
import './users.css'



export default function Users () {
    const {users} = useSelector((state)=> state.users)
    const navigate = useNavigate()
    const [userId, setUserId] = useState(null)
    const [userIdInput, setUserIdInput] = useState('')
    const handleChange = (e, newVal, setState) => {
      setState(newVal)
    }

    const handleInputChange = (e, newVal, setState) => {
        setState(newVal)
    }
    useEffect(()=> {
      if(userId !== null) {
        navigate(`/dashboard/users/${userId._id}`)
      }
    },[userId])
    return(    
        <>
          <h1>Users</h1>
          <div className='usersContainer'>
          <ComboBox disableClearable={false} label="Users" size='large' getOptionLabel={(option)=> option.firstName + ' ' + option.lastName} isOptionEqualToValue={(option, value)=> option.firstName === value.firstName} multiple={false} data={users} value={userId} inputValue={userIdInput} handleChange={(e, newVal, setState)=> handleChange(e, newVal, setUserId)} 
                    handleInputChange={(e, newVal, setState)=> handleInputChange(e, newVal, setUserIdInput)} renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, width: 'fit-content' }} {...props}>
                                <Avatar src={`/${option.avatarLink}`} alt='m' />
                                <span style={{marginLeft: '0.5em', fontWeight: 'bolder'}}>{option.firstName + ' ' + option.lastName}</span>
                            </Box>
                            )}/>
            <UsersTable data={users}/>
          </div>
        </>  
    )
}
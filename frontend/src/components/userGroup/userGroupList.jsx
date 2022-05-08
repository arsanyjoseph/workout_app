import UserGroupTable from "./userGroupsTable";
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../spinner";

export default function UserGroup () {
    const {user} = useSelector((state)=> state.auth)
    const navigate = useNavigate()
    const [userGroups, setUserGroups] = useState([])
    const url = '/api/usergroups/'
    useEffect(()=> {
        if(!user) {
            navigate('/login')
        }
        asyncFunc.getItems(url, user.token, setUserGroups)
    },[])

    if(!userGroups || userGroups.length == 0) {
        return (
        <>
            <h1 style={{fontWeight: 800}}>User Groups</h1>
                <div className="coolDownListContainer">
                    <CircularIndeterminate/>
                    <div className='buttons' style={{justifyContent: 'center', marginTop: '1em'}}>
                        <button className='submitBtn' onClick={()=> navigate('/dashboard/usergroups/new')}>New</button>
                    </div>
                    <h1>No Items Found</h1>
                </div>

        </>
        )
        
    }

    if(userGroups.length > 0) {
     return (
         <>
        <h1>User Groups</h1>
        <div className="userGroupListContainer">
            <div className='buttons' style={{justifyContent: 'center', marginBottom: '1em'}}>
                <button className='submitBtn' onClick={()=>navigate('/dashboard/usergroups/new')}>New</button>
            </div>
            <UserGroupTable data={userGroups} />
        </div> 
         </>
  
     )
     }
}
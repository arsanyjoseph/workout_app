import { useEffect, useState } from "react"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"
import { Navigate, useNavigate } from "react-router-dom"

export default function GroupsList ({id, token, url}) {
    const navigate = useNavigate()
    const [groups, setGroups] = useState([])
    useEffect(()=> {
        if(id && token && url) {
            asyncFunc.getItemsByUserId(url, id, token, setGroups)
        }
    },[id, token, url])
    return (
        <div>
            {groups.length > 0 ? groups.map((item, index)=> <span className="deleteBtn" key={index} onClick={()=> navigate(`/dashboard/usergroups/${item._id}`) }>{item.name}, </span>) : 'No User Group Assigned'}
        </div>
    )
}
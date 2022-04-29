import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CircularIndeterminate from "../spinner"
import asyncFunc from "../utils/asyncFuncs/asyncFuncs"

export default function UserView () {
    const {user} = useSelector((state)=> state.auth)
    const {id} = useParams()
    const navigate = useNavigate()
    const [userSelected, setUserSelected] = useState({})
    const url = '/api/users/'

    useEffect(()=> {
        if(!id) {
            navigate('/dashboard/users')
        }

        asyncFunc.getItem(url, id, user.token, setUserSelected)
    },[])

    if(!userSelected) {
        return <>
                 <CircularIndeterminate />
            </>
    }

    if(userSelected)
    console.log(userSelected)
    return (
        <div> Hello User  {id}</div>
        )
}
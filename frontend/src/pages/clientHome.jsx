import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

export default function ClientHome () {
    const {user} = useSelector((state)=> {
         return state.auth})
    const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate()
    useEffect(()=> {
        if(!user) {
            setRedirect(true)
        }
        if (user) {
            setRedirect(false)
        }
    },[redirect, user])
    return (
        <div>
                { redirect ? navigate('/')  : <h1>Hello Client</h1> }
        </div>
    )
}
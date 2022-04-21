import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import './css/client.css'



export default function ClientHome () {
    const {user} = useSelector((state)=> {
         return state.auth})
    const navigate = useNavigate()
    useEffect(()=> {
        if(!user) {
            navigate('/login')
        }
        if (user && user.isAdimn) {
            navigate('/dashboard')
        }
    },[user, navigate])

    if(user) {
        return (
            <div className="clientContainer">
                <div className="overlayClient">
                <Header name={user.firstName}/>
                </div>
            </div>
        )   
    }
    
}
import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux"
import { Outlet, useNavigate } from "react-router-dom";
import './css/dashboard.css'
import Header from '../components/header'
import {FaArrowDown} from 'react-icons/fa'

import { getAllUsers, reset } from '../features/users/usersSlice';

export default function Dashboard () {
    const {user} = useSelector((status)=> status.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=> {
        if(!user) {
            navigate('/login')
        }

        if(!user.isAdmin) {
            navigate('home')
        }

        if(user && user.isAdmin && !user.isPending) {
            dispatch(getAllUsers(user.token))
        }   
        dispatch(reset())
    },[user])
    
    return (
        <div className="dashboardContainer">
            <div className="overlayGradient">
                <Header name={user.firstName} validate={user.isAdmin}/>
                <h1>Dashboard</h1>
                <div><FaArrowDown/></div>
                <Outlet/>
            </div>
        </div>
    )
}
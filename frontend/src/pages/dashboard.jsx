import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux"
import { Outlet, useNavigate } from "react-router-dom";
import './css/dashboard.css'
import Header from '../components/header'

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
        dispatch(getAllUsers(user.token))
        dispatch(reset())
    },[user])
    
    return (
        <div className="dashboardContainer">
            <Header name={user.firstName} validate={user.isAdmin}/>
            <h1>Dashboard</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae obcaecati aliquid nesciunt sit quos aspernatur asperiores aut amet ducimus fugit quaerat, dolorem, ipsum consequuntur ea quae exercitationem expedita, reprehenderit voluptates.</p>
            <Outlet/>
        </div>
    )
}
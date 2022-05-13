import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import './css/client.css'
import { Outlet} from "react-router-dom";
import CircularIndeterminate from "../components/spinner";


export default function ClientHome () {
    const {user} = useSelector((state)=> state.auth)
    const navigate = useNavigate()
    
    useEffect(()=> {
        if(!user) {
            navigate('/')
        }
    },[user, navigate])

    if(!user) {
        return <CircularIndeterminate />
    }

    if(user.isPending) {
        return (
            <div className="clientContainer">
                <div className="overlayClient">
                <Header name={user.firstName} validate={user.isAdmin}/>
                    <div className="pendingContainer" style={{maxWidth: '50%', margin: '0 auto', backgroundColor: 'var(--white)', borderRadius: '5px', marginTop: '5em'}}>
                        <h1 style={{textAlign: 'center', color: 'white', backgroundColor: 'black', padding: '0.25em', }}>Pending</h1>
                        <p style={{fontSize: '3em', textAlign: 'center', fontWeight: 800, padding: '1em', margin: 0}}>Waiting For Admin Approval</p>
                    </div>
                </div>
            </div>
        )
    }

    if(user) {
        return (
            <div className="clientContainer">
                <div className="overlayClient">
                <Header name={user.firstName} validate={user.isAdmin}/>
                <Outlet/>
                </div>
            </div>
        )   
    }
    
}
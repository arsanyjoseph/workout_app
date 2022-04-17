import {BiLogIn, BiLogOut, BiUserPlus} from 'react-icons/bi'
import {AiFillSetting} from 'react-icons/ai'
import './header.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useEffect } from 'react'
import TemporaryDrawer from '../../src/components/drawer'



export default function Header(props) {
    const dispatch = useDispatch()
    const handleLogout = ()=> {
        dispatch(logout())
        dispatch(reset())
    }

    useEffect(()=> {

    },[dispatch, props])
    return (
        <header className='header'>
            <div className='logo'>
                <Link  className='linkStyle' to='/'>Header</Link>
            </div>
            <div className='optionsContainer'>
            { props.name ? <ul>
                    <li>
                        <Link className='linkStyle' to='/'> Hello, {props.name}</Link>
                    </li>
                    <li>
                        <Link className='linkStyle' to='/settings'> <AiFillSetting/></Link>
                    </li>
                    <li>
                        <TemporaryDrawer/>
                    </li>
                    <li>
                        <a  className='linkStyle' onClick={handleLogout}><BiLogOut/></a>
                    </li>
                </ul> : <ul>
                    <li>
                        <Link className='linkStyle' to='/login'><BiLogIn/> Login  </Link>
                    </li>

                    <li>
                        <Link className='linkStyle' to='/register'><BiUserPlus/> Register</Link>
                    </li>
                </ul>
        }
            </div>
        </header>
    )
}
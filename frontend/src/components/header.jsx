import {BiLogIn, BiLogOut, BiUserPlus} from 'react-icons/bi'
import {AiFillSetting} from 'react-icons/ai'
import './header.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useEffect } from 'react'
import TemporaryDrawer from '../../src/components/drawer'
import CustomizedMenus from './settingsIcon'
import ImageAvatars from './avatar'


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
                <Link  className='linkStyle' to='/'>Calisthenics Engineer</Link>
            </div>
            <div className='optionsContainer'>
            { props.name ? <ul>
                    <li>
                        <span className='linkStyle' >{'Hello, ' + props.name}</span>
                    </li>
                    <li>
                        <span className='linkStyle'><CustomizedMenus/></span>
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
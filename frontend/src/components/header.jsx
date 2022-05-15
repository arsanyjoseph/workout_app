import {BiLogIn, BiUserPlus} from 'react-icons/bi'
import {FaHome} from 'react-icons/fa'
import './header.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import TemporaryDrawer from '../../src/components/drawer'
import CustomizedMenus from './settingsIcon'
import DownTimer from './countdownTimer/countdownTimer'

export default function Header({name, validate, notif}) {
    useEffect(()=> {

    },[])
    return (
        <header className='header'>
            <div className='logo'>
                <img src='/assets/logo-2.png' alt='logo' />
                <Link  className='linkStyle' to='/home'><FaHome/> Home</Link>
            </div>
            {name && !validate && <DownTimer/>}
            <div className='optionsContainer'>
            { name ? <ul>
                    <li>
                        <span className='linkStyle' >{'Hello, ' + name}</span>
                    </li>
                    <li>
                        <span className='linkStyle'><CustomizedMenus notif={notif}/></span>
                    </li>
                    {validate && <li>
                        <TemporaryDrawer/>
                    </li>}
                </ul> : <ul>
                    <li>
                        <Link className='linkStyle' to='/ar'>ع</Link>
                    </li>
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
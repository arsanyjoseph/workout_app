import {BiLogIn} from 'react-icons/bi'
import {BiUserPlus} from 'react-icons/bi'
import './header.css'
import { Link } from 'react-router-dom'
import LandingPage from '../pages/landingPage'
import Login from '../pages/login'
import Register from '../pages/register'

export default function Header() {
    return (
        <header className='header'>
            <div className='logo'>
                <Link  className='linkStyle' to='/'>Header</Link>
            </div>
            <div className='optionsContainer'>
                <ul>
                    <li>
                        <Link className='linkStyle' to='/login'><BiLogIn/> Login  </Link>
                    </li>

                    <li>
                        <Link className='linkStyle' to='/register'><BiUserPlus/> Register</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}
import {BiLogIn} from 'react-icons/bi'
import {BiUserPlus} from 'react-icons/bi'
import './header.css'
import { Link } from 'react-router-dom'



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
import {BiLogIn, BiUserPlus} from 'react-icons/bi'
import './header.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import TemporaryDrawer from '../../src/components/drawer'
import CustomizedMenus from './settingsIcon'


export default function Header(props) {
    useEffect(()=> {

    },[ props])
    return (
        <header className='header'>
            <div className='logo'>
                <img src='/assets/logo-2.png' alt='logo' />
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
                    {props.validate && <li>
                        <TemporaryDrawer/>
                    </li>}
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
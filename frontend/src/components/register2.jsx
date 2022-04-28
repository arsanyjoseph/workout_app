import {BiUserPlus} from 'react-icons/bi'
import Header from '../components/header'
import './register2.css'


export default function Register2 () {
    return (
        <div className='mainDiv'>
        <Header/>
        <div className="formContainer">
                <div className='formHead'>
                    <h1> <BiUserPlus/> Register</h1>
                </div>
                <div className="formBody">
                <form className="formLogin">
                    <input type='text' name='firstName' placeholder='First Name'/>
                    <input type='text' name='lastName' placeholder='Last Name'/>
                    <input type='email' autoComplete="username" name="email" placeholder='Email' />
                    <input type='password' autoComplete="current-password" name="password" placeholder='Password'/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
        </div>
    )
}
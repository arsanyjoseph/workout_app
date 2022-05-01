import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login, reset } from '../features/auth/authSlice';
import './login2.css'
import CircularIndeterminate from "./spinner";
import {BiLogIn} from 'react-icons/bi'
import Header from './header'
import asyncFunc from "./utils/asyncFuncs/asyncFuncs";

export default function Login2 () {
    const [invalid, setInvalid] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const loginUser = (e) => {
        e.preventDefault()
        if(!email || !password) {
            console.log('Error')
        } else if (email === '' || password === '') {
            console.log('Empty Fields')
        } else {
            const userData = {
                email,
                password,
            }
            dispatch(login(userData))   
        }
    }

    const handleInputs = (e)=> {
        e.preventDefault()
        setFormData((prevState)=>( {
          ...prevState,
              [e.target.name]: e.target.value
        }) )
    }

    useEffect(()=> {

        if (isError) {
            setInvalid(true)
        } 

        if(isSuccess || user) {
            const logged = Date.now()
            asyncFunc.updateItem('/api/users/', user.id, { lastLogin: logged}, user.token )
            navigate('/home')
        }
        dispatch(reset())

    },[user, isSuccess, navigate, dispatch, isError, message])

    if(isLoading) {
        return <CircularIndeterminate/>
    }

    if (invalid) {
        return (
            <div className="loginBack">
            <Header/>
            <div className="loginContainer">
            <div className="formHead"> <BiLogIn/> Login</div>
            <div className="formBody">
               <h1>Invalid Login Attempt</h1>
               <h4>The E-mail or Password entered may be Incorrect</h4>
               <p>Return to <a href="/">Home Page</a> or <button className='retryBtn' onClick={()=> setInvalid(false)}>Retry</button> using Valid Credentials</p>
               <p>If not Registered ? <a href='/register'>Sign Up</a></p>
            </div>
        </div>
        </div>
        )
    }

    if (!invalid) {
    return (
        <div className="loginBack">
        <Header/>
        <div className="loginContainer">
            <div className="formHead"> <BiLogIn/> Login</div>
            <div className="formBody">
                <form onSubmit={(e)=> loginUser(e)} className="formLogin">
                    <input  onChange={(e)=> handleInputs(e)} type='email' autoComplete="username" name="email" value={email} placeholder='Email' />
                    <input  onChange={(e)=> handleInputs(e)} type='password' autoComplete="current-password" name="password" value={password} placeholder='Password'/>
                    <button className="submitBtn" type="submit">Login</button>
                </form>
            </div>
        </div>
        </div>
    )
}
}
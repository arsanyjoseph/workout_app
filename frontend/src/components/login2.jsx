import { useEffect, useState,memo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login, reset } from '../features/auth/authSlice';
import './login2.css'
import CircularIndeterminate from "./spinner";
import {BiLogIn} from 'react-icons/bi'
import Header from './header'

function Login2 () {
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
            console.log(message)
        } 

        if( isSuccess || user) {
            navigate('/home')
        }
        dispatch(reset())

    },[user, message, isLoading, isError, isSuccess, navigate, dispatch])

    if(isLoading) {
        return <CircularIndeterminate/>
    }
    return (
        <div className="loginBack">
        <Header/>
        <div className="loginContainer">
            <div className="formHead"> <BiLogIn/> Login</div>
            <div className="formBody">
                <form  onSubmit={(e)=> loginUser(e)} className="formLogin" onChange={(e)=> handleInputs(e)}>
                    <input type='email' autoComplete="username" name="email" value={email} placeholder='Email' />
                    <input type='password' autoComplete="current-password" name="password" value={password} placeholder='Password' />
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default memo(Login2)
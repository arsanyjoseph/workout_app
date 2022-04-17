import {useEffect, useState, memo } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../components/header'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import CircularIndeterminate from '../components/spinner';
import {BiLogIn} from 'react-icons/bi'
import './css/login.css'

const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides : {
                root: {
                    fontWeight: 800
                },
            }
        },
    },
})

function Login () {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [values, setValues] = useState({
        showPassword: false,
      });

      const handleInputs = (e)=> {
          setFormData((prevState)=>( {
            ...prevState,
                [e.target.name]: e.target.value
          }) )
      }


      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const {email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, isLoading, isSuccess, isError, message} = useSelector((state) => {
            return state.auth
        })

    const loginUser = (e) => {
        e.preventDefault()
        if(!email || !password) {
            console.log('Error')
        } else if (email === '' || password === '') {
            console.log('Error')
        } else {
            const userData = {
                email,
                password,
            }
            dispatch(login(userData))   
        }
    }
    
    useEffect(()=> {

        if (isError) {
            console.log(message)
            dispatch(reset())
        } 

        if( isSuccess || user) {
            navigate('/home')
            dispatch(reset())
        }

    },[user, message, isLoading, isError, isSuccess, navigate, dispatch])

    if(isLoading) {
        return <CircularIndeterminate/>
    }
    return (
        <ThemeProvider theme={theme}>
        <div className='mainDiv'>
        <Header/>
        <div className="loginContainer formContainer">
            <div className='formHead'>
                <h1> <BiLogIn/> Login</h1>
            </div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onChange={handleInputs}
                variant='standard'
                className='loginBox'
                >
                    <TextField
                    id="outlined-email-input"
                    label="E-mail"
                    type="email"
                    value={email}
                    name='email'
                    autoComplete='username'
                    sx={{ borderRadius: 2}}
                    className='formField'
                    inputlabelprops={{
                        style: { fontWeight: 800, },
                      }}
                    />
                    <br/>
                    <FormControl sx={{ m: 1, width: '25ch',  }} color = 'primary' variant="outlined" >
                        <InputLabel sx={{ color: 'black', fontWeight: 800,}} htmlFor="outlined-adornment-password" >Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleChange('password')}
                            autoComplete='current-password'
                            endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        name='password'
                        sx={{ borderRadius: 2}}
                        className='formField'
                        inputlabelprops ={{
                            style: { color: 'black', fontWeight: 800, },
                          }}
                    />
                    </FormControl>
                    <br/>
                    <Button onClick={(e)=>loginUser(e)} className='loginBtn' variant='contained' sx={{color: 'white', backgroundColor: 'black'}}>Login</Button>
                </Box>
            </div>
        </div>
        </ThemeProvider>
    )
}


export default memo(Login)
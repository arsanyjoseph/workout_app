import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Header from '../components/header'
import {BiUserPlus} from 'react-icons/bi'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import CircularIndeterminate from '../components/spinner'
import './css/register.css'
import handleErr from '../components/utils/errorAlert'


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

export default function Register () {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        height: 0,
        weight: 0,
        phoneNumber: 0,
    })

    const [err, setErr] = useState(false)

    const [invalid, setInvalid] = useState(false)

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

    const {firstName, lastName, email, password, height, weight, gender, phoneNumber } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message} = useSelector((state) => {
        return state.auth
    })

    const submitForm = (e) => {
        e.preventDefault()
        if(!firstName || !lastName || !email || !password ) {
            handleErr(setErr)
        } else if(firstName === '' || lastName === '' || email === '' || password === ''){
            handleErr(setErr)
        }
        
        else {
            const userData = {
                firstName,
                lastName,
                email,
                password,
                height,
                weight,
                gender,
                phoneNumber
            }
            dispatch(register(userData))
    }
}


    useEffect(()=> {
        if (isError) {
            setInvalid(true)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    },[user, message, isError, isSuccess, navigate, dispatch])


    if(isLoading) {
        return <CircularIndeterminate/>
    }

    if(invalid) {
        return (
            <div className="loginBack">
            <Header/>
            <div className="loginContainer">
            <div className="formHead"> <BiUserPlus/> Register</div>
            <div className="formBody">
               <h1>Invalid SignUp Attempt</h1>
               <h4>The E-mail Provided Already Exists</h4>
               <h4>Please, Assign Different E-mail <button className='retryBtn' onClick={()=> setInvalid(false)}>Here</button></h4>
               <p>Or Return to <a className='retryBtn' href="/">Home Page</a></p>
            </div>
        </div>
        </div>
        )
    }
 
    if (!invalid) {
    return (
        <ThemeProvider theme={theme}>
        <div className='mainDiv'>
            <Header/>
            <div className="formContainer">
                <div className='formHead'>
                    <h1><BiUserPlus/> Register</h1>
                </div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch', },
                    }}
                    noValidate
                    autoComplete="off"
                    onChange={handleInputs}
                    variant='standard'
                    className='registerBox'
                    >
                        <TextField
                        id="outlined-firstName-input"
                        label="First Name"
                        type="text"
                        value={firstName}
                        name='firstName'
                        />

                        <TextField
                        id="outlined-lastName-input"
                        label="Last Name"
                        type="text"
                        value={lastName}
                        name='lastName'
                        />

                        <TextField
                        id="outlined-email-input"
                        label="E-mail"
                        type="email"
                        value={email}
                        name='email'
                        autoComplete='username'
                        />

                        <TextField
                        id="outlined-phoneNumber-input"
                        label="Phone Number"
                        type="number"
                        value={phoneNumber}
                        name='phoneNumber'
                        />
                        
                        <FormControl sx={{ m: 1, width: '25ch' }} color = 'primary' variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                        />
                        </FormControl>
                        <br/>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-weight">Weight</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                value={weight}
                                onChange={(e)=>handleInputs(e)}
                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                label='weight'
                                type='number'
                                name='weight'
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-height">Height</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-height"
                                value={height}
                                onChange={(e)=> handleInputs(e)}
                                endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                label='height'
                                type='number'
                                name='height'
                            />
                        </FormControl>

                        <TextField
                            id="outlined-select-gender"
                            select
                            label="Gender"
                            value={gender}
                            type='text'
                            onChange={handleInputs}
                            name='gender'
                            >
                                <MenuItem key='male' value='male'>Male</MenuItem>
                                <MenuItem key='female' value='female'>Female</MenuItem>                       
                        </TextField>
                        <br/>

                </Box>
                {err && <div className='errMessage' style={{width: '100%', fontSize: '2em',textAlign: 'center', fontWeight: '800'}} >Please, Fill Mandatory Fields</div>}
                <Button onClick={(e)=>submitForm(e)} variant='contained' className='registerBtn' sx={{ width: 'fit-content', height: '6ch', color: 'white', backgroundColor: 'black', padding: '1.5em', fontSize: '1em', fontWeight: 'bolder'}}>Submit</Button>
            </div>
        </div>
        </ThemeProvider>
    )
}
}
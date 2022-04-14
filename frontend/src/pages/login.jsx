import { useState } from 'react'
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


export default function Login () {
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

    const { email, password} = formData
    return (
        <ThemeProvider theme={theme}>
            <Header/>
        <div className='mainDiv'>
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
                    InputLabelProps={{
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
                        InputLabelProps={{
                            style: { color: 'black', fontWeight: 800, },
                          }}
                    />
                    </FormControl>
                    <br/>
                    <Button className='loginBtn' variant='contained' sx={{color: 'white', backgroundColor: 'black'}}>Login</Button>
            </Box>
        </div>
        </div>
        </ThemeProvider>
    )
}
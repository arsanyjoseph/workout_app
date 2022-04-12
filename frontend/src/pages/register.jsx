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
import MenuItem from '@mui/material/MenuItem';

import {BiUserPlus} from 'react-icons/bi'
import './css/register.css'


export default function Register () {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        height: null,
        weight: null,
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

    const {firstName, lastName, email, password, height, weight, gender } = formData
    return (
        <div className="formContainer">
            <div className='formHead'>
                <h1> <BiUserPlus/> Register</h1>
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

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-weight">Weight</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            value={weight}
                            onChange={handleChange('weight')}
                            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                            label='weight'
                            type='number'
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-height">Height</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-height"
                            value={height}
                            onChange={handleChange('height')}
                            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                            label='height'
                            type='number'
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
            </Box>
        </div>
    )
}
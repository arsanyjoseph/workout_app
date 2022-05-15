import { useEffect, useState } from 'react'
import { Box,IconButton ,Button, TextField, FormControl, InputLabel, OutlinedInput, MenuItem, InputAdornment, Checkbox, Switch,FormControlLabel } from "@mui/material"
import {Visibility, VisibilityOff} from '@mui/icons-material'
import Header from '../components/header'
import {BiUserPlus} from 'react-icons/bi'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import CircularIndeterminate from '../components/spinner'
import './css/register.css'
import handleErr from '../components/utils/errorAlert'
import countries from '../components/utils/countries';
import memberships from '../components/utils/memberships'
import consent from '../components/utils/consent'; 
import PrivacyModal from '../components/privacy/privacyModal';


const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides : {
                root: {
                    fontWeight: 800,
                },
            }
        },
    },
})

export default function Register () {
    const [personalInfo, setPersonalInfo] = useState({
        isInjured: false,
        injury: '',
        trainPlace: '',
        target: '',
        trainDays: 0,
        isOtherSport: false,
        otherSport: '',
        isShootPics: true,
    })
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        location: '',
        height: 0,
        weight: 0,
        phoneNumber: 0,
        age: 0,
        personalInfo: personalInfo,
        membership: ''
    })
    
    const [checkbox1 , setCheckBox1] = useState(false)
    const [checkbox2 , setCheckBox2] = useState(false)
    const [phase, setPhase] = useState(1)

    const [err, setErr] = useState(false)

    const [invalid, setInvalid] = useState(false)

    const [values, setValues] = useState({
        showPassword: false,
      });

      const handleInputs = (e, setState)=> {
          setState((prevState)=>({
            ...prevState,
                [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
          }))
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

    const handleNext = (i)=> {
        if (phase === 1) {
            setFormData((prevState)=> ({
                ...prevState,
                    personalInfo: personalInfo
            }))
        }
        setPhase(i)
    }


    const {firstName, lastName, email, password, height, weight, gender, phoneNumber, location, age, membership } = formData
    const {injury, trainDays, trainPlace, target, otherSport, isInjured, isOtherSport, isShootPics} = personalInfo
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message} = useSelector((state) => {
        return state.auth
    })


    const submitForm = (e) => {
        e.preventDefault()
        if(checkbox1 === false || checkbox2 === false || firstName.length === 0 || lastName.length === 0 || password.length === 0 || email.length === 0 || location.length === 0 || weight === 0 || height === 0 || target.length === 0 || trainDays === 0 || trainPlace.length === 0 || gender.length === 0 || membership.length === 0) {
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
                phoneNumber,
                location,
                age,
                personalInfo,
                membership, 
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
    },[user, message, isError, isSuccess, navigate, dispatch, formData, personalInfo])
    if(isLoading) {
        return (
            <>
            <CircularIndeterminate/>
            </>
        )
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
    if(!invalid && phase === 1) {
        return (
            <div className='mainDiv' style={{minHeight: '100vh'}}>
                <Header/>
                <div className="formContainer">
                    <div className='formHead'>
                        <h1><BiUserPlus/> Register</h1>
                    </div>
                    <div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch', },
                    }}
                    noValidate
                    autoComplete="off"
                    onChange={(e, setState)=> handleInputs(e, setPersonalInfo)}
                    variant='standard'
                    className='registerBox'
                    >
                        <TextField
                        id="outlined-target-input"
                        label="** What is Your Target ?"
                        type="text"
                        value={target}
                        name='target'
                        />
                        <br/>
                        <TextField
                        id="outlined-trainPlace-input"
                        label="** Where is your Training Place ?"
                        type="text"
                        value={trainPlace}
                        name='trainPlace'
                        />
                        <TextField
                        id="outlined-trainDays-input"
                        label="** Days of Training"
                        type="number"
                        value={trainDays}
                        name='trainDays'
                        />
                        <FormControlLabel control={<Switch name='isInjured' checked={isInjured} />} label="Injury ?" />
                        {isInjured && <TextField
                        id="outlined-injury-input"
                        label="Mention any Injury"
                        type="text"
                        value={injury}
                        name='injury'
                        />}
                        {!isInjured && <br/>}
                        <FormControlLabel control={<Switch name='isOtherSport' checked={isOtherSport} />} label="Other Sport ?" />
                        {isOtherSport && <TextField
                        id="outlined-otherSport-input"
                        label="Mention any Other Sports"
                        type="text"
                        value={otherSport}
                        name='otherSport'
                        />}
                        {!isOtherSport && <br/>}
                        <FormControlLabel control={<Switch name='isShootPics' checked={isShootPics} />} label="Do You Agree on Uploading Personal Pics for Follow Up purposes ?" />
                        <TextField
                            id="outlined-select-plan"
                            select
                            label="Plan"
                            value={membership}
                            type='text'
                            onChange={(e, setState)=> handleInputs(e, setFormData)}
                            name='membership'
                            >
                                {memberships.map((item, index)=> <MenuItem key={item.name} value={item.name}>{item.name}: {item.price}</MenuItem>)}
                        </TextField>
                        <br/>
                        <Button onClick={()=>handleNext(2)} variant='contained' className='registerBtn' sx={{ width: 'fit-content', height: '6ch', color: 'white', backgroundColor: 'black', padding: '1.5em', fontSize: '0.75em', fontWeight: 'bolder',}}>Next</Button>
                    </Box>
                    {err && <div className='errMessage' style={{width: '100%', fontSize: '2em',textAlign: 'center', fontWeight: '800'}} >Please, Fill Mandatory Fields</div>}
                    </div>
                </div>
            </div>
        )
    }
    if (!invalid && phase === 2) {
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
                    onChange={(e, setState)=> handleInputs(e, setFormData)}
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
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-age">Age</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-age"
                                value={age}
                                onChange={(e, setState)=> handleInputs(e, setFormData)}
                                label='age'
                                type='number'
                                name='age'
                            />
                        </FormControl>
                        <TextField
                        id="outlined-phoneNumber-input"
                        label="Phone Number"
                        type="number"
                        value={phoneNumber}
                        name='phoneNumber'
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
                                onChange={(e, setState)=>handleInputs(e, setFormData)}
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
                                onChange={(e, setState)=> handleInputs(e, setFormData)}
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
                            onChange={(e, setState)=> handleInputs(e, setFormData)}
                            name='gender'
                            >
                                <MenuItem key='male' value='male'>Male</MenuItem>
                                <MenuItem key='female' value='female'>Female</MenuItem>                       
                        </TextField>
                        <br/>
                        <TextField
                            id="outlined-select-location"
                            select
                            label="Location"
                            value={location}
                            type='text'
                            onChange={(e, setState)=> handleInputs(e, setFormData)}
                            name='location'
                            >
                                {countries.map((item, index)=> <MenuItem key={index} value={item.label}>{item.label}</MenuItem>)}
                        </TextField>
                            <br/>
                        <Button onClick={()=>handleNext(1)} variant='contained' className='registerBtn' sx={{ width: 'fit-content', height: '6ch', color: 'white', backgroundColor: 'black', padding: '1.5em', fontSize: '0.75em', fontWeight: 'bolder'}}>Back</Button>
                <Button onClick={()=>handleNext(3)} variant='contained' className='registerBtn' sx={{ width: 'fit-content', height: '6ch', color: 'white', backgroundColor: 'black', padding: '1.5em', fontSize: '0.75em', fontWeight: 'bolder',}}>Next</Button>
                </Box>
                {err && <div className='errMessage' style={{width: '100%', fontSize: '2em',textAlign: 'center', fontWeight: '800'}} >Please, Fill Mandatory Fields</div>}

            </div>
        </div>
        </ThemeProvider>
    )
}
    if(!invalid && phase === 3) {
        return (
            <div className='mainDiv' >
            <Header/>
            <div className="formContainer" style={{ maxWidth: '100%'}}>
                <div className='formHead'>
                    <h1><BiUserPlus/> Register</h1>
                </div>
                <div className='registerBox registerBoxMod' >
                    <h2>Before Completing the Registration, Note that:</h2>
                    <ul>
                        {consent.map((item, index)=> <p key={index}>- {item}</p>)}
                    </ul>
                    <FormControlLabel  control={<Checkbox value={checkbox1} onChange={()=>setCheckBox1(!checkbox1)} />}  label="I agree On The Registration General notes" labelPlacement='end' />
                    <br/>
                    <FormControlLabel  control={<Checkbox value={checkbox2} onChange={()=>setCheckBox2(!checkbox2)}/>}  label={<PrivacyModal />} labelPlacement='end' />
                    <div>
                    <Button onClick={()=>handleNext(2)} variant='contained' className='registerBtn' sx={{ width: 'fit-content', height: '6ch', color: 'white', backgroundColor: 'black', padding: '1.5em', fontSize: '0.75em', fontWeight: 'bolder',}}>Back</Button>

                    
                    <Button onClick={(e)=>submitForm(e)} variant='contained' className='registerBtn' sx={{ width: 'fit-content', height: '6ch', color: 'white', backgroundColor: 'black', padding: '1.5em', fontSize: '0.75em', fontWeight: 'bolder', float: 'right'}}>Submit</Button>
                    </div>

                </div>
                {err && <div className='errMessage' style={{width: '100%', fontSize: '2em',textAlign: 'center', fontWeight: '800'}} >Please, Fill All Mandatory Fields</div>}

            </div>

            </div>
        )
    }
}
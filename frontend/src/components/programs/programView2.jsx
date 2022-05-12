import {useParams} from 'react-router-dom'
import './programCreate.css'
import CircularIndeterminate from '../spinner'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './cycle.css'
import extractData from '../utils/extractData'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ComboBox from './autoComplete'
import Typography from '@mui/material/Typography';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function ProgView () {
    const {id} = useParams()
    const [program, setProgram] = useState([])
    const {user} = useSelector((state)=> state.auth)
    const {users} = useSelector((state)=> state.users)
    const url = '/api/programs/'
    const [showUsers, setShowUsers] = useState(false)
    

    useEffect(()=> {
        if(id) {
            asyncFunc.getItem(url, id, user.token, setProgram)
            console.log(program)
        }
    },[])
    if(!program.name) {
      return (
        <CircularIndeterminate />
    )  
    }
    if(program.name) {
     return (
        <div className='newCoolDownContainer progCreate'>
            <h1>{program.name}</h1>
            <button className='weekBtn' onClick={()=> setShowUsers(!showUsers)}>Assign</button>
            <Modal
                open={showUsers}
                onClose={()=> setShowUsers(false)}
                aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
            >
                <Box sx={{style}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
                    <ComboBox disableClearable={false} label="Users" size='large' getOptionLabel={(option)=> option.firstName} isOptionEqualToValue={(option, value)=> option.firstName === value.firstName} multiple={false} data={users} />
                </Box>
            </Modal>
            {program.details.map((item, index)=> <GenerateWeek key={index} weekInd={index} days={item}/>)}
        </div>
    )   
    }
}

function GenerateWeek ({weekInd, days}) {
    return (
        <div className="weekContainer">
            <h3>Week {weekInd +1}</h3>
            <div className="daysContainer">
                {days.map((item, index)=> <GenerateDays key={index} dayCount={(7 * weekInd) + index +1} day={item}/>)}
            </div>
        </div>
    )
}


function GenerateDays ({dayCount, day}) {
    return (
        <div className="dayCont">
            <h4>Day {dayCount}</h4>
            {day.map((item, index)=> <GenerateCycle key={index} cycleIndex={index} cycle={item} /> )}
        </div>
    )
}

function GenerateCycle ({cycleIndex, cycle}) {
    const {workouts} = useSelector((state)=> state.workouts)
    return (
        <div className="cycleForm">
            {!cycle.isRest && <><p>{extractData(cycle.warmup, workouts.warmups)}</p>

            <p>{extractData(cycle.cooldown, workouts.cooldowns)}</p>
            
            {cycle.exercise.map((item, index)=> {
                const name = extractData(item, workouts.exercises)
                return <p key={index}>{name}</p>
            })}
            
            </>}


            {cycle.isRest && <h2>Rest</h2>}

        </div>
    )
}
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './countdownTimer.css'
export default function DownTimer () {
    const {user} = useSelector((state)=> state.auth)
    const [timerDays, setTimerDays] = useState();
    const [timerHours, setTimerHours] = useState();
    const [timerMinutes, setTimerMinutes] = useState();
    const [timerSeconds, setTimerSeconds] = useState();

    let interval;

    const startTimer = ()=> {
        const countDownDate = new Date(user.extendTime).getTime()
        interval = setInterval(()=> {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance/(24*60*60*1000));
            const hours = Math.floor(distance%(24*60*60*1000)/(1000*60*60));
            const minutes = Math.floor(distance%(60*60*1000)/(1000*60));
            const seconds = Math.floor(distance%(60*1000)/(1000));
            
            if(distance < 0) {
                clearInterval(interval.current);
            } else {
                setTimerDays(days)
                setTimerHours(hours)
                setTimerMinutes(minutes)
                setTimerSeconds(seconds)
            }
        })
    }

    useEffect(()=> {
       const timer =  startTimer();

       return ()=> clearInterval(timer)
    })
    return (
        <div className="timerContainer">
            <h1>{timerDays}</h1>
            <h1>{timerHours}</h1>
            <h1>{timerMinutes}</h1>
            <h1>{timerSeconds}</h1>
        </div>
    )
}
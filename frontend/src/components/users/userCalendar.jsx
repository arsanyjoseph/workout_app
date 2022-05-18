import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useRef } from 'react';
import './userCalendar.css'



export default function Calendar ({events, handleClick}) {
    const calendarRef = useRef(null)
    useEffect(()=> {

    },[])
    return (
        <FullCalendar
        ref={calendarRef}
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleClick}
        />
    )
}
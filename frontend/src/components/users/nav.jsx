import { useEffect, useState } from 'react'
import './navdash.css'


export default function NavDash ({show, setEvents}) {
    useEffect(()=> {

    },[show])
    return (
        <>
            <div className={ show ? 'navdash show' : 'navdash hide'}>
                <ul>
                    <li><button className='nullBtn' value='Goals' onClick={setEvents}>Goals</button></li>
                    <li><button className='nullBtn' value='Equipments' onClick={setEvents}>Equipments</button></li>
                    <li><button className='nullBtn' value='Metric Sets' onClick={setEvents}>Metric Sets</button></li>
                    <li><button className='nullBtn' value='Nutrition Plan' onClick={setEvents}>Nutrition Plan</button></li>
                    <li><button className='nullBtn' value='Limitations' onClick={setEvents}>Limitations</button></li>
                    <li><button className='nullBtn' value='Progress Pics' onClick={setEvents}>Progess Pics</button></li>
                    <li><button className='nullBtn' value='Notes' onClick={setEvents}>Notes</button></li>
                </ul>
             </div>  
        </>
    )
}
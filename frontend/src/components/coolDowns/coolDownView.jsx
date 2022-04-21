import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux';

export default function CoolDownView () {
    const {id}= useParams();
    const {user} = useSelector((state)=> state.auth)

    
    useEffect(()=> {

    })

    return (
        <div>CoolDownView: {id} </div>
    )
}
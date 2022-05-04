import { useEffect, useState } from "react";
import LibraryCard from "./libraryCard";
import asyncFunc from "../utils/asyncFuncs/asyncFuncs";
import { useSelector } from "react-redux";
import CircularIndeterminate from "../spinner";
import { useNavigate } from "react-router-dom";

export default function LibraryView () {
    const {user} = useSelector((state)=> state.auth)
    const [vids, setVids] = useState([])
    const urlApi = '/api/videos/'
    const navigate = useNavigate()

    useEffect(()=> {
        asyncFunc.getItems(urlApi, user.token, setVids)
        console.log(vids.length)
    },[])

    if(vids.length === 0) {
        return <CircularIndeterminate />
    }

    if(vids.length > 0) {
    return (
        <>
        <h1>Library</h1>
        <div className="coolDownListContainer">
            <div className='buttons' style={{justifyContent: 'center', marginBottom: '1em'}}>
                <button className='submitBtn' onClick={()=> navigate('/dashboard/library/new')}>New</button>
            </div>
            <div>
                {vids.map((item, index)=> <LibraryCard key={index} cardTitle={item.name} CardDescription={item.description} url={item.link} />)}
            </div>
        </div>
        </>
    )
}
}
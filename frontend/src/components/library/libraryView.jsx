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
    const deleteItem = (i)=> {
       asyncFunc.handleDelete(urlApi, i, user.token)
       asyncFunc.getItems(urlApi, user.token, setVids)
    }

    useEffect(()=> {
        asyncFunc.getItems(urlApi, user.token, setVids)
    },[])

    if(vids.length === 0) {
        return (
        <>
        <h1>Library</h1>
        <div className="coolDownListContainer">
            {user.isAdmin && <div className='buttons' style={{justifyContent: 'center', marginBottom: '1em'}}>
                <button className='submitBtn' onClick={()=> navigate('/dashboard/library/new')}>New</button>
            </div>}
            <CircularIndeterminate />
            <h1>No Items Found</h1>
        </div>
        </>
        )
    }

    if(vids.length > 0) {
    return (
        <>
        <h1>Library</h1>
        <div className="coolDownListContainer">
            {user.isAdmin && <div className='buttons' style={{justifyContent: 'center', marginBottom: '1em'}}>
                <button className='submitBtn' onClick={()=> navigate('/dashboard/library/new')}>New</button>
            </div>}
            <div>
                {vids.map((item, index)=> <LibraryCard key={index} user={user} deleteItem={()=> deleteItem(item._id)} cardTitle={item.name} CardDescription={item.description} url={item.link} />)}
            </div>
        </div>
        </>
    )
}
}
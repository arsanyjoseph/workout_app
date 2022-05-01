import './imageUpload.css'
import {FaFileUpload} from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux'

export default function UploadAvatar() {
    const {user} = useSelector((state)=> state.auth)
    const [file, setFile] = useState(null)
    const [fileUploaded, setFileUploaded] = useState({})
    const handleChange = (e)=> {
        e.preventDefault()
        setFile(e.target.files[0])
    }

    const uploadAvatar = async (url, token, formData, setState)=> {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        }
        const response = await axios.post(url,formData, config)
        setState(response.data)
        console.log(response.data)
        return response.data
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        const url = '/api/users/upload';
        const formData = new FormData();
        formData.append('myImage', file);
        if(!user.token) {
            console.log('no token')
        } else {
            uploadAvatar(url, user.token, formData, setFileUploaded)
        }
    } 

    useEffect(()=> {

    },[fileUploaded])
        
    return (
        <div className='uploadContainer'>
            <h1>Upload Avatar</h1>
            <h2>Please, Choose a Valid File</h2>
            <form onSubmit={handleSubmit} >
                <label htmlFor='avatarInput'><FaFileUpload className='uploadIcon'/></label> <br/>
                <input id='avatarInput' hidden name="myImage" type='file' onChange={handleChange}/> <br/>
                <button className='submitBtn' type="submit">Submit</button>
            </form>
            <div>{fileUploaded.path ? fileUploaded.path : 'No upload'}</div>
            {fileUploaded.path ? <img src={fileUploaded.path} alt='image' /> : <h1>Nu Upload Yet</h1>}
        </div>
    )
}

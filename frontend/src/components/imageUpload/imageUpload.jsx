import './imageUpload.css'
import {FaFileUpload} from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux'
import ImageAvatars from '../avatar';

export default function UploadAvatar() {
    const {user} = useSelector((state)=> state.auth)
    const [file, setFile] = useState(null)
    const [fileUploaded, setFileUploaded] = useState({})
    const [showMsg, setShowMsg] = useState(false)
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
        return response.data
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        if (file === null) {
            console.log('Please Select a File')
        } else {
          const url = '/api/users/upload';
        const formData = new FormData();
        formData.append('myImage', file);
        if(!user.token) {
            console.log('no token')
        } else {
            uploadAvatar(url, user.token, formData, setFileUploaded)
            setShowMsg(true)
        }  
        }
        
    } 

    useEffect(()=> {
        console.log(fileUploaded)
    },[fileUploaded])
        
    return (
        <div className='uploadContainer'>
            <h1>Upload Avatar</h1>
            {!showMsg ? 
            <>
            <h2>Please, Choose a Valid File</h2>
            <form className='uploadForm' onSubmit={handleSubmit} >
                <label htmlFor='avatarInput'><FaFileUpload className='uploadIcon'/></label> <br/>
                <input id='avatarInput' hidden name="myImage" type='file' onChange={handleChange}/> <br/>
                <button className='submitBtn' type="submit">Submit</button>
            </form>
            </> 
            
            :
            
            <>
             <h2 className={fileUploaded.path ? 'successUpload uploadMsg' : 'failedUpload uploadMsg'}>{fileUploaded.path ? 'Image Successfully Uploaded' : 'Failed to Upload Image'}</h2>
            {fileUploaded.path ? <ImageAvatars imgSrc={'/' + fileUploaded.path} name={user.firstName}/> : <h1>No Image Selected Yet</h1>}
            <br/>
            </>}
        </div>
    )
}

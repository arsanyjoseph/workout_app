import './imageUpload.css'
import {FaFileUpload} from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import ImageAvatars from '../avatar';
import handleErr from '../utils/errorAlert'
import {uploadImage} from '../../features/auth/authSlice'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'

export default function UploadAvatar() {
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)
    const [file, setFile] = useState(null)
    const [fileUploaded, setFileUploaded] = useState({})
    const [showMsg, setShowMsg] = useState(false)
    const [err, setErr] = useState(false)
    const handleChange = (e)=> {
        e.preventDefault()
        setFile(e.target.files[0])
    }

    const [newUser, setNewUser] = useState({})

    const uploadAvatar = async (url, token, formData, setState)=> {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        }
        const response = await axios.post(url,formData, config)
        setState(response.data)
        dispatch(uploadImage(response.data.avatarLink))
        return response.data
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        if (file === null) {
            handleErr(setErr)
        } else {
          const url = '/api/users/upload';
        const formData = new FormData();
        formData.append('avatarImg', file);
        if(!user.token) {
            console.log('no token')
        } else {
            uploadAvatar(url, user.token, formData, setFileUploaded)
            asyncFunc.getItem('/api/users/', user.id, user.token, setNewUser)
        }  
        }
        
    } 

    useEffect(()=> {
        if(fileUploaded.avatarLink) {
            dispatch(uploadImage(fileUploaded.avatarLink))
            setShowMsg(true)
        }
    },[fileUploaded])
        
    return (
        <div className='uploadContainer'>
            <h1>Upload Avatar</h1>
            {!showMsg ? 
            <>
            <h2>Please, Choose a Valid File</h2>
            <form className='uploadForm' onSubmit={handleSubmit} >
                <label htmlFor='avatarInput'><FaFileUpload className='uploadIcon'/></label> <br/>
                <input id='avatarInput' hidden name="avatarImg" type='file' onChange={handleChange}/> <br/>
                <button className='submitBtn' type="submit">Submit</button>
            </form> 
            {err && <div style={{width: '100%', fontSize: '1.75em'}} className='errMessage' >Please, Select A Valid File Type</div>}
            </>
            :
            
            <>
             <h2 className={fileUploaded.avatarLink ? 'successUpload uploadMsg' : 'failedUpload uploadMsg'}>{fileUploaded.avatarLink ? 'Image Successfully Uploaded' : 'Failed to Upload Image'}</h2>
            {fileUploaded.avatarLink ? <ImageAvatars imgSrc={'/' + fileUploaded.avatarLink} name={user.firstName}/> : <h1>No Image Selected Yet</h1>}
            <br/>
            </>}
        </div>
    )
}

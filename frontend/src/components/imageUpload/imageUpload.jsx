import './imageUpload.css'
import {FaFileUpload} from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';

export default function UploadAvatar() {
    const [file, setFile] = useState(null)
    const handleChange = (e)=> {
        e.preventDefault()
        setFile(e.target.files[0])
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        const url = '/api/users/upload';
        const formData = new FormData();
        formData.append('myImage', file);
        const config = {
              headers: {
                'content-type': 'multipart/form-data'
            }
            }
    axios.post(url, formData, config)
      .then((response) => {
        console.log(response.data);
      })
    }
        
    return (
        <div className='uploadContainer'>
            <h1>Upload Avatar</h1>
            <h2>Please, Choose a Valid File</h2>
            <form onSubmit={handleSubmit} >
                <label htmlFor='avatarInput'><FaFileUpload className='uploadIcon'/></label> <br/>
                <input id='avatarInput' hidden name="myImage" type='file' onChange={handleChange}/> <br/>
                <button className='submitBtn' type="submit">Submit</button>
            </form>
        </div>
    )
}

//encType='multipart/form-data' method='POST' action='/api/users/upload'
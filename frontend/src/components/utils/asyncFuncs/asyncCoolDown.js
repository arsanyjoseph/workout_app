import axios from 'axios'


//Get All CoolDown List
const getCoolDowns = async (token, setState)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get('/api/cooldowns/', config)
    setState(response.data)
    return response.data
}

//Get CoolDown By Id
const getCoolDown = async (id, token, setState)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get('/api/cooldowns/' + id, config)
    setState(response.data)
    return response.data
}

//Create New CoolDown
const createCoolDown = async (data, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post('/api/cooldowns/', data, config)
    console.log(response.data)
    return response.data
}

//Split Youtube Video
const linkVid = (i)=> {
    return 'https://www.youtube.com/embed/' + i.split('=')[1]
}

//Update CoolDown Data
const updateCoolDown = async (id, data, token, setState) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } 
    const response = await axios.put('/api/cooldowns/' + id, data, config)
    setState(response.data)
    return response.data
}

//Delete CoolDown
const handleDelete = async (id, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete('/api/cooldowns/' + id, config)
    return response.data}

const coolDownAsyncFunc = {
    createCoolDown,
    getCoolDown,
    linkVid,
    updateCoolDown,
    handleDelete,
    getCoolDowns
}

export default coolDownAsyncFunc
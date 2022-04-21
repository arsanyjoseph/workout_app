import axios from 'axios'

//Get CoolDown By Id
const getCoolDown = async (id, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get('/api/cooldowns/' + id, config)
    console.log(response.data)
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

const coolDownAsyncFunc = {
    createCoolDown,
    getCoolDown,
    linkVid
}

export default coolDownAsyncFunc
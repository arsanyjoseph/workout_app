import axios from 'axios'

const API_URL = '/api/users/'

const getAllUsers = async (token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    console.log(response.data)
    return response.data
}



const usersService = {
    getAllUsers,
}

export default usersService
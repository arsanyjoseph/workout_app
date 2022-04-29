import axios from 'axios'


//Get All Items List
const getItems = async (url, token, setState)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(url, config)
    setState(response.data)
    return response.data
}

//Get Item By Id
const getItem = async (url, id, token, setState)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(url + id, config)
    setState(response.data)
    return response.data
}

//Create New Item
const createItem = async (url, data, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(url, data, config)
    console.log(response.data)
    return response.data
}

//Split Youtube Video
const linkVid = (i)=> {
    return 'https://www.youtube.com/embed/' + i.split('=')[1]
}

//Update Item Data
const updateItem = async (url, id, data, token, setState) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } 
    const response = await axios.put(url + id, data, config)
    setState(response.data)
    return response.data
}

//Delete Item
const handleDelete = async (url, id, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(url + id, config)
    return response.data}

const asyncFunc = {
    createItem,
    getItem,
    linkVid,
    updateItem,
    handleDelete,
    getItems
}

export default asyncFunc
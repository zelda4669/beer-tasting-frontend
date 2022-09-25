import axios from 'axios'
const baseUrl = '/api/brewery'

function getAll() {
    let req = axios.get(baseUrl)
    return req.then(res => res.data)
}

function createBrewery(newObject) {
    let req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

function updateBrewery(id, newObject) {
    let req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(res => res.data)
}

function deleteBrewery(id) {
    return axios.delete(`${baseUrl}/${id}`)
}

const breweryService = { 
    getAll, 
    createBrewery, 
    updateBrewery, 
    deleteBrewery 
}

export default breweryService
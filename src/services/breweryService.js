import axios from 'axios'
const baseUrl = '/api/brewery'

function getAll() {
    let req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = (newObject) => {
    let request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
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
    create, 
    updateBrewery, 
    deleteBrewery 
}

export default breweryService
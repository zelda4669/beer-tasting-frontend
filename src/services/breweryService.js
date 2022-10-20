import axios from 'axios'
const baseUrl = '/api/brewery'

let token = null

function setToken(newToken) {
  token = `bearer ${newToken}`
}

async function getAll() {
  let res = await axios.get(baseUrl)
  return res.data
}

async function create(newObject) {
  let config = {
    headers: { Authorization: token }
  }
  let res = await axios.post(baseUrl, newObject, config)
  return res.data
}

async function updateBrewery(id, newObject) {
  let res = await axios.put(`${baseUrl}/${id}`, newObject)
  return res.data
}

function deleteBrewery(id) {
  return axios.delete(`${baseUrl}/${id}`)
}

const breweryService = {
  getAll,
  create,
  updateBrewery,
  deleteBrewery,
  setToken
}

export default breweryService
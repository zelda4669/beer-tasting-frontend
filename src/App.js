import React, { useState, useEffect } from 'react'

import BreweryListing from './components/display-breweries'
import NewBrewery from './components/new-brewery-form'
import Login from './components/login'

import breweryService from './services/breweryService'
import loginService from './services/login'

import './App.css'

function App() {
  const [checked, setChecked] = useState(false)
  const [breweries, setBreweries] = useState([])
  const [searchBreweries, setSearchBreweries] = useState('')
  const [searchLocations, setSearchLocations] = useState('')
  const [newBreweryName, setNewBreweryName] = useState('')
  const [newBreweryLocation, setNewBreweryLocation] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    breweryService
      .getAll()
      .then(initialBreweries => {
        setBreweries(initialBreweries)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function handleCheck(e) {
    let id = e.target.id
    let brewery = breweries.find(b => b.id === id)
    let changedBrewery = {...brewery, tasted: !brewery.tasted}
    breweryService
      .updateBrewery(brewery.id, changedBrewery)
    setChecked(!checked)
  }

  const brewerySearch = breweries.filter(b => b.name.toLowerCase().includes(searchBreweries) && b.location.toLowerCase().includes(searchLocations))

  function handleBrewerySearch(e) {
    setSearchBreweries(e.target.value)
  }

  function handleLocationSearch(e) {
    setSearchLocations(e.target.value)
  }

  function handleDelete(e) {
    let id = e.target.value
    let brewery = breweries.find(b => b.id === id)
    if(window.confirm(`Are you sure you want to delete ${brewery.name}? This action cannot be undone.`)) {
      breweryService
        .deleteBrewery(id)
        .then(() => setBreweries(breweries.filter(b => b !== brewery)))
    }
  }

  function addBrewery(e) {
    e.preventDefault()
    const breweryObject = {
      name: newBreweryName,
      location: newBreweryLocation
    }
    const names = breweries.map(b => b.name)

    if(names.includes(newBreweryName)) {
      window.alert(`${newBreweryName} is already in the database!`)
      setNewBreweryName('')
      setNewBreweryLocation('')
    } else {
      breweryService
        .create(breweryObject)
        .then((returnedBrewery) => {
          // setTimeout(() => {
          //   console.log('timeout')
          // }, 500)
          setBreweries(breweries.concat(returnedBrewery))
          setNewBreweryName('')
          setNewBreweryLocation('')
        })
        .catch(err => console.log(err))
    }
  }

  function handleNameChange(e) {
    setNewBreweryName(e.target.value)
  }

  function handleLocationChange(e) {
    setNewBreweryLocation(e.target.value)
  }

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      window.alert('Your username and/or password are incorrect. Please check your credentials and try again.')
      setUsername('')
      setPassword('')
    }
  }

  function handleUser(e) {
    setUsername(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  function loginForm() {
    return(
      <Login
        userValue={username}
        handleUser={handleUser}
        passwordValue={password}
        handlePassword={handlePassword}
        handleLogin={handleLogin}
      />
    )
  }

  function breweryForm() {
    return(
      <NewBrewery 
        newBrewery={newBreweryName}
        newBreweryLocation={newBreweryLocation}
        handleNameChange={handleNameChange}
        handleLocationChange={handleLocationChange}
        addBrewery={addBrewery}
      />
    )
  }

  return (
    <div>
      <h1>Breweries</h1>
      
      {user === null
        ? loginForm()
        : <div>
            <p>Welcome, {user.username}!</p>
            {breweryForm()}
          </div>
      }

      <BreweryListing 
        searchBreweries={searchBreweries} 
        searchLocations = {searchLocations}
        handleBrewerySearch={handleBrewerySearch}
        handleLocationSearch={handleLocationSearch} 
        brewerySearch={brewerySearch} 
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App

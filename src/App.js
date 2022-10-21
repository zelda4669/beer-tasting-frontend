import React, { useState, useEffect, useRef } from 'react'

import BreweryListing from './components/display-breweries'
import NewBrewery from './components/new-brewery-form'
import Login from './components/login'
import Button from './components/button'
import Toggle from './components/toggle'

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBreweryappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      breweryService.setToken(user.token)
    }
  }, [])

  function handleCheck(e) {
    let id = e.target.id
    let brewery = breweries.find(b => b.id === id)
    let changedBrewery = { ...brewery, tasted: !brewery.tasted }
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

  const breweryFormRef = useRef()

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
      breweryFormRef.current.toggleVisibility()
      breweryService
        .create(breweryObject)
        .then((returnedBrewery) => {
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

  const loginRef = useRef()

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username: loginRef.current.username,
        password: loginRef.current.password
      })

      window.localStorage.setItem(
        'loggedBreweryappUser', JSON.stringify(user)
      )

      breweryService.setToken(user.token)
      setUser(user)
      loginRef.current.setUsername('')
      loginRef.current.setPassword('')
    } catch(exception) {
      window.alert('Your username and/or password are incorrect. Please check your credentials and try again.')
      loginRef.current.setUsername('')
      loginRef.current.setPassword('')
    }
  }

  function handleLogout(e) {
    e.preventDefault()
    breweryService.setToken(null)
    setUser(null)
    window.localStorage.removeItem('loggedBreweryappUser')
  }

  function loginForm() {
    return(
      <Toggle value='login' buttonLabel='Login'>
        <Login handleLogin={handleLogin} ref={loginRef} />
      </Toggle>
    )
  }

  function breweryForm() {
    return(
      <Toggle value='add' buttonLabel='Add a Brewery' ref={breweryFormRef}>
        <NewBrewery
          newBrewery={newBreweryName}
          newBreweryLocation={newBreweryLocation}
          handleNameChange={handleNameChange}
          handleLocationChange={handleLocationChange}
          addBrewery={addBrewery}
        />
      </Toggle>

    )
  }

  return (
    <div>
      <h1>Breweries</h1>

      {user === null
        ? loginForm()
        : <div>
          <p>Welcome, {user.username}! <Button value='logout' onClick={handleLogout} text='Logout' /></p>
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

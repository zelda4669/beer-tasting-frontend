import React, { useState, useEffect } from 'react'

import BreweryListing from './components/display-breweries'

import breweryService from './services/breweryService'

import './App.css'

function App() {
  const [checked, setChecked] = useState(false)
  const [breweries, setBreweries] = useState([])
  const [searchBreweries, setSearchBreweries] = useState('')
  const [searchLocations, setSearchLocations] = useState('')

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

  function handleCheck(event) {
    let id = event.target.id
    let brewery = breweries.find(b => b.id === id)
    let changedBrewery = {...brewery, tasted: !brewery.tasted}
    breweryService
      .updateBrewery(brewery.id, changedBrewery)
    setChecked(!checked)
  }

  const brewerySearch = breweries.filter(b => b.name.toLowerCase().includes(searchBreweries) && b.location.toLowerCase().includes(searchLocations))

  function handleBrewerySearch(event) {
    setSearchBreweries(event.target.value)
  }

  function handleLocationSearch(event) {
    setSearchLocations(event.target.value)
  }

  function handleDelete(event) {
    let id = event.target.value
    let brewery = breweries.find(b => b.id === id)
    if(window.confirm(`Are you sure you want to delete ${brewery.name}? This action cannot be undone.`)) {
      breweryService
        .deleteBrewery(id)
        .then(() => setBreweries(breweries.filter(b => b !== brewery)))
    }
  }

  function handleUpdate() {
    console.log('Update')
  }

  return (
    <div>
      <h1>Breweries</h1>
      <BreweryListing 
        searchBreweries={searchBreweries} 
        searchLocations = {searchLocations}
        handleBrewerySearch={handleBrewerySearch}
        handleLocationSearch={handleLocationSearch} 
        brewerySearch={brewerySearch} 
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  )
}

export default App

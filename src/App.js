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

  const handleBrewerySearch = (event) => {
    console.log(event.target.value)
    setSearchBreweries(event.target.value)
    console.log('brewery search', brewerySearch)
  }

  const handleLocationSearch = (event) => {
    setSearchLocations(event.target.value)
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
      />
    </div>
  )
}

export default App

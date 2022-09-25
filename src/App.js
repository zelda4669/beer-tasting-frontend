import React, { useState, useEffect } from 'react'

import Brewery from './components/brewery'

import breweryService from './services/breweryService'

import './App.css'

function App() {
  const [checked, setChecked] = useState(false)
  const [breweries, setBreweries] = useState([])

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

  return (
    <div>
      <h1>Breweries</h1>
        <div class='allBreweries'>
          {breweries.map(b =>
            <Brewery key={b.id} item={b} handleCheck={handleCheck} />
          )}
        </div>
        
    </div>
  )
}

export default App

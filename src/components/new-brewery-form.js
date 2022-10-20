import React from 'react'

function NewBrewery({
  newBrewery,
  newBreweryLocation,
  handleNameChange,
  handleLocationChange,
  addBrewery
}) {

  function click() {
    console.log('click')
  }

  return(
    <div>
      <h3>Add A Brewery:</h3>
      <form onSubmit={addBrewery}>
        <p>Name: <input value={newBrewery} onChange={handleNameChange} /></p>
        <p>Location: <input value={newBreweryLocation} onChange={handleLocationChange} /></p>
        <button type='submit' onClick={click}>Add</button>
      </form>

    </div>
  )
}

export default NewBrewery
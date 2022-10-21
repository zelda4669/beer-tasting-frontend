import React from 'react'

import Brewery from './brewery'
import Search from './search'

const BreweryListing = ({
  searchBreweries,
  handleBrewerySearch,
  brewerySearch,
  searchLocations,
  handleLocationSearch,
  handleDelete
}) => {
  return (
    <div>
      <h3>Search: </h3>
      <Search search={searchBreweries} handleSearch={handleBrewerySearch} type='Name' />
      <Search search = {searchLocations} handleSearch={handleLocationSearch} type='Location' />
      <div className='allBreweries'>
        {brewerySearch.map(b =>
          <Brewery
            key={b.id}
            item={b}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}

export default BreweryListing


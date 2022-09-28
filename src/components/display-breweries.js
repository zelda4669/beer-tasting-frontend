import React from 'react'

import Brewery from './brewery'
import Search from './search'

const BreweryListing = ({ 
    searchBreweries, 
    handleBrewerySearch, 
    brewerySearch, 
    searchLocations, 
    handleLocationSearch, 
    handleCheck 
}) => {
    return (
        <div>
            <Search search={searchBreweries} handleSearch={handleBrewerySearch} type='Name' />
            <Search search = {searchLocations} handleSearch={handleLocationSearch} type='Location' />
            <div class='allBreweries'>
            {brewerySearch.map(b =>
                <Brewery key={b.id} item={b} handleCheck={handleCheck} />
            )}
            </div>
        </div>
    )
}

export default BreweryListing


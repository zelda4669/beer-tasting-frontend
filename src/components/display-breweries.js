import React from 'react'

import Brewery from './brewery'
import Search from './search'

const BreweryListing = ({ 
    searchBreweries, 
    handleBrewerySearch, 
    brewerySearch, 
    searchLocations, 
    handleLocationSearch, 
    handleCheck,
    handleDelete,
    handleUpdate 
}) => {
    return (
        <div>
            <h3>Search: </h3>
            <Search search={searchBreweries} handleSearch={handleBrewerySearch} type='Name' />
            <Search search = {searchLocations} handleSearch={handleLocationSearch} type='Location' />
            <div class='allBreweries'>
            {brewerySearch.map(b =>
                <Brewery 
                    key={b.id} 
                    item={b} 
                    handleCheck={handleCheck} 
                    handleDelete={handleDelete} 
                    handleUpdate={handleUpdate} 
                />
            )}
            </div>
        </div>
    )
}

export default BreweryListing


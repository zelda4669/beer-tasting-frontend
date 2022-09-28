import React from 'react'

const Search = ({ search, handleSearch, type }) => {
    return(
        <div>
        Search by {type}: <input
                  value={search}
                  onChange={handleSearch}
                />
      </div>
    )

}

export default Search
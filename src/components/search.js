import React from 'react'
import Field from './field'

const Search = ({ search, handleSearch, type }) => {
  return(
    <div>
        Search by {type}: <Field
        value={search}
        handleChange={handleSearch}
        type='text'
      />
    </div>
  )

}

export default Search
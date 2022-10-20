import React from 'react'

function Field({ value, handleChange, type }) {
  return(
    <input value={value} onChange={handleChange} type={type} />
  )
}

export default Field
import React from 'react'

function Button({ value, onClick, text }) {
  return (
    <button value={value} onClick={onClick}>{text}</button>
  )
}

export default Button
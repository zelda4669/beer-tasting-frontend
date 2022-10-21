import React from 'react'
import { useState } from 'react'

import breweryService from '../services/breweryService'
import Button from './button'

function Brewery({ item, handleDelete }) {
  const [checked, setChecked] = useState(false)

  async function handleCheck() {
    let brewery = item
    let changedBrewery = { ...brewery, tasted: !brewery.tasted }
    await breweryService.updateBrewery(brewery.id, changedBrewery)
    setChecked(!checked)
  }

  function handleUpdate() {
    console.log('this will update the brewery')
  }

  return (
    <div className='breweryCard'>
      <h3 className='breweryName'>{item.name}</h3>
      <ul>
        <li>Location: {item.location}</li>
        <li><label>Tried?</label>
          <input
            type='checkbox'
            id={item.id}
            defaultChecked={item.tasted}
            onChange={handleCheck}
          />
        </li>
        <li>
          <Button value={item.id} onClick={handleUpdate} text='Update Brewery' />
          <Button value={item.id} onClick={handleDelete} text='Delete Brewery' />
        </li>
      </ul>
    </div>
  )
}

export default Brewery
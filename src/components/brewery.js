import React from 'react'
import Button from './button'

function Brewery({ item, handleCheck, handleDelete, handleUpdate }) {
    return (
        <div class='breweryCard'>
            <h3 class='breweryName'>{item.name}</h3>
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
                    {/* <Button value={item.id} onClick={handleUpdate} text='Update Brewery' /> */}
                    <Button value={item.id} onClick={handleDelete} text='Delete Brewery' />
                </li>
            </ul>
        </div>
    )
  }

export default Brewery
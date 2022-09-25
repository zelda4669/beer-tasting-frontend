import React from 'react'

function Brewery({ item, handleCheck }) {
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
            </ul>
        </div>
    )
  }

export default Brewery
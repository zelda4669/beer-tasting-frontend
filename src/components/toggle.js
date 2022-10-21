import React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from './button'

const Toggle = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hidden = { display: visible ? 'none' : '' }
  const shown = { display: visible ? '' : 'none' }

  function toggleVisibility() {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hidden}>
        <Button value={props.value} onClick={toggleVisibility} text={props.buttonLabel} />
      </div>
      <div style={shown}>
        {props.children}
        <Button value='cancel' onClick={toggleVisibility} text='Cancel' />
      </div>
    </div>
  )
})

Toggle.displayName = 'Toggle'
Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggle
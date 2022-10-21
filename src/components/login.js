import React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Field from './field'

const Login = forwardRef((props, refs) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleUser(e) {
    setUsername(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  useImperativeHandle(refs, () => {
    return {
      username,
      password,
      setUsername,
      setPassword
    }
  })

  return (
    <form onSubmit={props.handleLogin}>
            Username: <Field value={username} handleChange={handleUser} />
            Password: <Field value={password} handleChange={handlePassword} type='password' />
      <button type='submit'>Login</button>
    </form>
  )
})

Login.displayName = 'Login'
Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default Login
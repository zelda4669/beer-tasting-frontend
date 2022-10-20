import React from 'react'
import Field from './field'

function Login({ username, handleUser, password, handlePassword, handleLogin }) {
  return(
    <form onSubmit={handleLogin}>
            Username: <Field value={username} handleChange={handleUser} />
            Password: <Field value={password} handleChange={handlePassword} type='password' />
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login
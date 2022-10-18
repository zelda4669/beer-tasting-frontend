import React from 'react'
import Field from './field'

function Login({ userValue, handleUser, passwordValue, handlePassword, handleLogin }) {
    return(
        <form onSubmit={handleLogin}>
            Username: <Field value={userValue} handleChange={handleUser} />
            Password: <Field value={passwordValue} handleChange={handlePassword} type='password' />
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login
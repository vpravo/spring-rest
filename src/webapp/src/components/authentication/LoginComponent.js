import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import axios from 'axios';
import AuthenticationService from './AuthenticationService';
import { publishAuthenticated } from './AuthenticatedSubject';

const LoginComponent = (props) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const [formErrors, setFormErrors] = useState(
        {
            username: '',
            password: ''
        }
    )

    const [loginError, setloginError] = useState(null)

    const handleCredentialsChange = (event) => {
        setCredentials({ ...credentials, [event.target.id]: event.target.value })
    }

    const attemptLogin = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return
        }

        axios({
            method: 'get',
            url: '/api/authenticate',
            auth: credentials
        })
            .then(response => {
                setloginError(false)
                AuthenticationService.registerSuccessfulLogin(credentials.username)
                publishAuthenticated(response.data)
                if(response.data.roles.includes("ADMIN")){
                    props.history.push('/admin')
                }else {
                    props.history.push('/user')
                }

            })
            .catch(error => {
                setloginError(true)
            })
    }

    const validateForm = () => {
        let formErrors = {}
        formErrors.username = credentials.username === '' ? 'username is required' : null
        formErrors.password = credentials.password === '' ? 'password is required' : null
        setFormErrors(formErrors)

        if (Object.values(formErrors).every(x => (x === null || x === ''))) {
            return true
        }

        return false
    }

    return (
        <div>
            <h4>Login</h4>
            <br />
            {loginError && <div className={classnames('text-danger', 'offset-sm-2')}>Bad credentials</div>}
            <br />
            <form onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    attemptLogin(event)
                                }
                              }} >
                <div className={classnames('form-group', 'row')} >
                    <label className="col-sm-2 col-form-label">Username</label>
                    <div className='col-sm-4'>
                        <input id="username" type="text"
                            className={classnames('form-control', formErrors.username && 'border-danger')}
                            placeholder="Username"
                            onChange={handleCredentialsChange} value={credentials.username} />
                        {formErrors.username && <span className='text-danger'>{formErrors.username}</span>}
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-4">
                        <input id="password" type="password"
                            className={classnames('form-control', formErrors.password && 'border-danger')}
                            placeholder="Password"
                            onChange={handleCredentialsChange} value={credentials.password}
                            />
                        {formErrors.password && <span className='text-danger'>{formErrors.password}</span>}

                    </div>
                </div>
            </form>
            <div className="col-sm-6">
                <button className={classnames('btn', 'btn-primary', 'float-right', 'mx-1')}
                    onClick={attemptLogin}>Login</button>
            </div>
        </div >
    )
}


export default LoginComponent
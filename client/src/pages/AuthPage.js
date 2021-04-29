import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext)

  const {loading, request, error, clearErrors} = useHttp()

  const [form, setForm] = useState({email: '', password: ''})

  const message = useMessage()

  useEffect( () => {
    message(error)
    clearErrors()
  }, [error, message, clearErrors])

  useEffect (() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async() =>  {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e){}
  }
  
  const loginHandler = async() =>  {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e){}
  }

  return (
    <div className='row'>
      <div className='col s6 offset-s3' style={{'width':'100%', 'marginLeft': 0}}>
        <h1 style={{'fontSize':'30px', 'fontWeight':800, 'textAlign': 'center'}}>Shorten your Links</h1>
        <div className='card blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Enjoy after login ;-)</span>
            <div>

              
              <div className="input-field">
                <input 
                  placeholder="Enter your email" 
                  id="email" 
                  type="text" 
                  className="validate" 
                  name="email"
                  onChange={changeHandler}
                  value={form.email}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input 
                  placeholder="Enter your password" 
                  id="pass" 
                  type="password" 
                  className="validate" 
                  name="password"
                  onChange={changeHandler}
                  value={form.password}
                />
                <label htmlFor="pass">Password</label>
              </div>
              

            </div>
          </div>
          <div className='card-action'>
            <button 
              className="btn yellow darken-4"
              onClick={loginHandler}
              disabled={loading}
            >Login</button>
            <button 
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >Registration</button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react'
import axios from 'axios'
import { csrfToken } from './helpers/csrf'

const Login = ({ state, setState, setUsername }) => {
  const handleClick = () => {
    setState(!state)
  }

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [errorData, setErrorData] = useState({
    message: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    // console.log('Event Target Value ->', event.target.value)
    setFormData(newFormData)
  }

  // this takes in a token arguement
  const setItemToLocalStorage = (token) => {
    // console.log(token)
    // In order to access local storage we access it through the window
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log('Form Data ->', formData)
    try {
      const { data } = await axios.post('/api/auth/login/', formData, {
        headers: {
          'X-CSRFToken': csrfToken(),
        },
      })
      setItemToLocalStorage(data.token)
      localStorage.setItem('username', formData.username)
      setUsername(formData.username)
      handleClick()
      location.reload()
    } catch (err) {
      // console.log('Error ->', err)
      setErrorData(err.response.data)
      console.log(errorData)
    }
  }

  return (
    <div className='popup-wrapper'>
      <div className='popup-screen' onClick={handleClick} />
      <div className='popup-window'>
        <div className='popup-header'>
          <h3 className='bold large white margin-0'>Log in</h3>
        </div>
        <h4 className='indented white normal bold'>Log in to edit your profile</h4>
        <form onSubmit={handleSubmit} className='popup-form-container'>
          <div>
            <div className='input-field first'>
              <p className='error'>{ formData.username ? errorData.message : '*'}</p>
              <p className='input-label normal small dark-blue'>Username</p>
              <input
                type='text'
                name='username'
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='input-field last'>
            <p className='error'>{ formData.password ? errorData.password : '*'}</p>
            <p className='input-label normal small dark-blue'>Password</p>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className='submit-button white normal bold' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )

}
export default Login
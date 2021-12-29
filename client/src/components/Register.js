import React, { useState } from 'react'
import axios from 'axios'

const Register = ({ state, setState, createNewUser }) => {
  const handleClick = () => {
    createNewUser(formData.username)
    setState(!state)
  }

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [errorData, setErrorData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log('Event Target Value ->', event.target.value)
    setFormData(newFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Form Data ->', formData)
    try {
      await axios.post('/api/auth/register/', formData)
      handleClick()
    } catch (err) {
      console.log('Error ->', err)
      setErrorData(err.response.data)
      console.log(errorData)
    }
  }

  return (
    <div className='popup-wrapper'>
      <div className='popup-screen' onClick={handleClick} />
      <div className='popup-window'>
        <div className='popup-header'>
          <h3 className='bold large white margin-0' >Sign up</h3>
        </div>
        <h4 className='indented white normal bold'>Sign up to build your profile!</h4>
        <form onSubmit={handleSubmit} className='popup-form-container'>
          <div>
            <div className='input-field first'>
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

          <div className='input-field'>
            <p className='input-label normal small dark-blue'>Email</p>
            <input
              type='text'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className='input-field'>
            <p className='input-label normal small dark-blue'>Password</p>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className='input-field last'>
            <p className='input-label normal small dark-blue'>Password confirmation</p>
            <input
              type='password'
              name='password_confirmation'
              placeholder='Password confirmation'
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>
          <button className='submit-button white normal bold' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )

}
export default Register
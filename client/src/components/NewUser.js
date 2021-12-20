import React from 'react'

const NewUser = ({ newUser, createNewUser, setVisibilityLogin }) => {
  const handleClick = (text) => {
    createNewUser(false)
    if (text === 'Log in and explore!') {
      setVisibilityLogin(true)
    }
  }

  return (
    <div className='popup-wrapper'>
      <div className='popup-screen' />
      <div className='popup-window'>
        <div className='popup-header'>
          <h3 className='white normal bold'>Welcome <span className='light-blue'>{newUser}</span>!</h3>
        </div>
        <div className='popup-form-container'>
          <h4 className='white large bold'>🎉&nbsp;🎉&nbsp;🎉&nbsp;&nbsp;</h4>
          <h4 className='white medium bold centered'>Your account has been successfully created.</h4>
          <button onClick={(event) => handleClick(event.target.innerText)} className='submit-button white normal bold' type='submit'>Log in and explore!</button>
        </div>
      </div>
    </div>
  )

}
export default NewUser
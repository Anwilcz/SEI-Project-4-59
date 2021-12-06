import React from 'react'

const SeeYou = ({ username, setUsername, setVisibilitySeeYou }) => {
  const handleClick = () => {
    setUsername(false)
    setVisibilitySeeYou(false)
  }

  return (
    <div className='popup-wrapper'>
      <div className='popup-screen' />
      <div className='popup-window'>
        <div className='popup-header'>
          <h3 className='white normal bold'>See you soon <span className='light-blue'>{username}</span>!</h3>
        </div>
        <div className='popup-form-container'>
          <h4 className='white normal bold'>👋&nbsp;👋&nbsp;👋&nbsp;&nbsp;</h4>
          <h4 className='white normal bold centered'>We are sad to see you go!</h4>
          <button onClick={handleClick} className='submit-button white normal bold' type='submit'>Bye bye..</button>
        </div>
      </div>
    </div>
  )

}
export default SeeYou
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import NewUser from './NewUser.js'
import SeeYou from './SeeYou'
import { getPayLoad } from './helpers/auth'

const Navbar = () => {
  const navigate = useNavigate()
  const [visibleRegister, setVisibilityRegister] = useState(false)
  const [visibleSeeYou, setVisibilitySeeYou] = useState(false)
  const [visibleLogin, setVisibilityLogin] = useState(false)
  const initialUsername = localStorage.getItem('username')
  const [username, setUsername] = useState(initialUsername ? initialUsername : null)
  const [newUser, createNewUser] = useState(false)
  const [categories] = useState([])


  // Toggle navbar background transparency
  window.addEventListener('scroll', function () {
    const navbarElements = document.querySelectorAll('.toggle-background')
    const scrollYPosition = window.scrollY
    let breakPoint
    if (window.location.pathname === '/') {
      breakPoint = 525
    } else {
      breakPoint = 0
    }
    if (scrollYPosition >= breakPoint) {
      navbarElements.forEach(element => {
        element.classList.add('white')
      })
    } else {
      navbarElements.forEach(element => {
        element.classList.remove('white')
      })
    }
  })


  const togglePop = (action) => {

    if (action === 'Sign up') {
      setVisibilityRegister(!visibleRegister)
      setVisibilityLogin(false)
    }
    if (action === 'Log in') {
      setVisibilityLogin(!visibleLogin)
      setVisibilityRegister(false)
    }
  }

  const redirect = (url) => {
    navigate(url, { replace: true })
    window.scrollTo(0, 0)
  }

  // !!!!!!!!!!!!!!!!!!!

  const userIsAuthenticated = () => {
    const payload = getPayLoad()
    if (!payload) return false
    // const now = Math.round(Date.now() / 1000)
    if (payload) return true //if (now < payload.exp) return true
    return false
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    setVisibilitySeeYou(true)
  }

  const publicMenu = (
    <>
      <div onClick={(event) => {
        togglePop(event.target.innerText)
      }} className='dropdown-item'>Log in</div>
      <div onClick={(event) => {
        togglePop(event.target.innerText)
      }} className='dropdown-item'>Sign up</div>
    </>
  )

  const userMenu = (
    <div>
      <div onClick={() => {
        redirect(`/profile/user?name=${username}`)
      }} className='dropdown-item'>User profile</div>
      <div className='dropdown-item' onClick={() => {
        redirect('/profiles')
      }} >
        All profiles
      </div>
      <hr />
      <div className='dropdown-item' onClick={handleLogout}>Log out</div>
    </div>
  )

  return (
    <div className='navbar-wrapper'>
      <div onClick={() => {
        redirect('/')
        categories.splice(0, categories.length)
      }}>
        <div className='logo'>
          <div className='icon chart-icon' />
          <p className='bold logo-size white'>Developer Insights</p>
        </div>
      </div>
      {/* <div className='categories'>
        ddd
      </div> */}
      <div className='menu'>
        <div className='icon user-icon' />
        {username ? <p className='user-message white normal'>Welcome back <span className='bold light-blue'>{username}</span>!</p> : <p className='white normal'>Log in</p>}
        <div className='dropdown-content'>
          {userIsAuthenticated() ? userMenu : publicMenu}
        </div>
      </div>
      {visibleRegister ? <Register className='ui modal' state={visibleRegister} setState={setVisibilityRegister} createNewUser={createNewUser} /> : null}
      {visibleLogin ? <Login className='ui modal' setUsername={setUsername} state={visibleLogin} setState={setVisibilityLogin} /> : null}
      {newUser ? <NewUser className='ui modal' newUser={newUser} createNewUser={createNewUser} setVisibilityLogin={setVisibilityLogin} /> : null}
      {visibleSeeYou ? <SeeYou className='ui modal' username={username} setUsername={setUsername} setVisibilitySeeYou={setVisibilitySeeYou} /> : null}
    </div>
  )
}
export default Navbar



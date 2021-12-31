import React from 'react'
import 'animate.css'
import { useNavigate } from 'react-router'


const UserTile = ({ user }) => {
  const navigate = useNavigate()

  const redirect = (url) => {
    navigate(url, { replace: true })
    window.scrollTo(0, 0)
  }

  return (
    <div className='row user-tile margin-bottom-small' onClick={() => {
      redirect(`/profile/user?name=${user.username}`)
    }}>
      <div className='profile-image small-image' style={{ backgroundImage: `url('/static${user['profile']['image']}')` }} />
      <p className='medium white big indented-2'>{user.username}</p>
    </div>
  )

}
export default UserTile
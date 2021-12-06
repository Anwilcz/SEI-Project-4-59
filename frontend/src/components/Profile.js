import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getPayLoad } from './helpers/auth'


const Profile = () => {
  const [user, setUser] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const { search } = window.location



  useEffect(() => {
    const getUser = async () => {
      try {
        const username = new URLSearchParams(search).get('name')
        const { data } = await axios.get(`/api/profile/${username}/`)
        setUser(data)
      } catch (err) {
        console.log(err)
        setUser(null)
      }
    }
    getUser()
  }, [search])

  useEffect(() => {
    const checkOwner = () => {
      console.log(user)
      if (user) {
        try {
          const payload = getPayLoad()
          const currentUserId = payload.sub
          console.log('username', user.username)
          if (currentUserId === user.id) {
            setIsOwner(true)
            console.log(isOwner)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
    checkOwner()
  })

  const userProfile = (
    <div className='profile-header'>
      <div className='profile-image' style={{ background: user.profile.image }}/>
      <h2 className='bold large white'>{user.username}</h2>
    </div>
  )
    

  return (
    <div className='content-wrapper'>
      {!user ? <p className='white normal bold'>User does not exist</p> :
        user.profile ? userProfile 
          : 
          <button className='submit-button white normal bold'>Create profile</button>
      }
        
    </div >
  )

}
export default Profile
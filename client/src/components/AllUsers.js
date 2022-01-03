import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserTile from './UserTile'
import 'animate.css'


const AllUsers = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get('/api/profile/')
        setUsers(data)
      } catch (err) {
        // console.log(err)
      }
    }
    getUser()
  }, [])


  const loadingData = (
    <h2 className='light light-grey normal indented margin-top-double'>Profile data loading, please wait..</h2>
  )

  const userProfiles = () => {
    return (
      <div className='content-wrapper margin-top-double margin-bottom'>
        <h2 className='bold white big margin-top-double'>All profiles <span className='light big'>({users.length})</span></h2>
        {(users).map(user => {
          return <UserTile key={user.id} user={user} />
        })}
      </div>
    )
  }


  return (
    <div className='content-wrapper'>
      {users ? userProfiles() : loadingData}
    </div >
  )

}
export default AllUsers
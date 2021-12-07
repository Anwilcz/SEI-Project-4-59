import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getPayLoad, getTokenFromLocalStorage } from './helpers/auth'
import TileSmall from './TileSmall'


const Profile = () => {
  const [user, setUser] = useState(null)
  const [imageUpload, setImageUpload] = useState(false)
  const [formData, setFormData] = useState({})
  const [isOwner, setIsOwner] = useState(false)

  const { search } = window.location

  const [tools, setTools] = useState({ languages: [], databases: [], webframes: [] })

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/tools/') // * <-- replace with your endpoint
      const languages = data.filter(tool => (tool.category === 'languages' && tool.name !== 'NA'))
      const databases = data.filter(tool => (tool.category === 'databases' && tool.name !== 'NA'))
      const webframes = data.filter(tool => (tool.category === 'webframes' && tool.name !== 'NA'))
      setTools({ languages: languages, databases: databases, webframes: webframes })
    }
    getData()


  }, [])

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

  const handleInputChanges = (event) => {
    console.log(event.target.files)
    setFormData({
      ...formData,
      [event.target.name]: event.target.files[0],
    })
  }

  const handleSubmitImage = async (event) => {
    event.preventDefault()
    try {
      console.log(formData)
      await axios.put(`/api/profile/${user.username}/`, formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
    } catch (err) {
      console.log(err)
      console.log(err.response)
    }
  }

  const addProfilePicture = (
    <div className='profile-section'>
      <form method='post' encType='multipart/form-data' onSubmit={(event) => {
        handleSubmitImage(event)
      }
      }>
        <label className='white normal bold' htmlFor="image">Browse</label>
        <button className='white light normal' id="file-chosen"></button>  {/*{formData.image ? formData.image[0].name : 'No file chosen'} */}
        <input onChange={(event) => {
          handleInputChanges(event)
        }} className='submit-button white normal bold' type="file"
        id="image" hidden name="image"
        accept="image/png, image/jpeg"></input>
        <button type='submit' className='submit-button white normal bold'>Submit</button>
      </form>
    </div>
  )


  const userProfile = () => {
    const favouritedLanguages = tools.languages.filter(tool => user.profile.favourited.includes(tool.id))
    const favouritedDatabases = tools.databases.filter(tool => user.profile.favourited.includes(tool.id))
    const favouritedWebframes = tools.webframes.filter(tool => user.profile.favourited.includes(tool.id))

    return (
      <div className='row'>
        <div className='column-300 content-wrapper'>
          <div className='profile-image centered' style={{ backgroundImage: `url('${user['profile']['image']}')` }} />
          <h2 className='name bold large white centered'>{user.username}</h2>
          {isOwner ?
            <div className='profile-buttons'>
              <button className='submit-button white normal bold' onClick={() => {
                console.log(imageUpload)
                setImageUpload(!imageUpload)
                console.log(imageUpload)
              }
              }>Change image</button>
              {imageUpload ? addProfilePicture : null}
              <button className='submit-button white normal bold'>Edit profile</button>
            </div>
            : null
          }
          <div className='profile-section'>
            <p className='bold medium white'>Slogan: <span className='normal medium white'>{user['profile']['slogan']}</span></p>
            <p className='bold medium white'>Location: <span className='normal medium white'>{user['profile']['location']}</span></p>
          </div>
        </div>
        <div className='column-fill content-wrapper'>
          <p className='bold medium white indented-2'>Favourite languages <span className='normal medium white'>({favouritedLanguages.length})</span></p>
          <div className='grid'>
            {(favouritedLanguages).map(tool => {
              return <TileSmall key={tool.name} tool={tool} />
            })}
          </div>
          <p className='bold medium white indented-2'>Favourite databases <span className='normal medium white'>({favouritedDatabases.length})</span></p>
          <div className='grid'>
            {(favouritedDatabases).map(tool => {
              return <TileSmall key={tool.name} tool={tool} />
            })}
          </div>
          <p className='bold medium white indented-2'>Favourite webframes <span className='normal medium white'>({favouritedWebframes.length})</span></p>
          <div className='grid'>
            {(favouritedWebframes).map(tool => {
              return <TileSmall key={tool.name} tool={tool} />
            })}
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className='content-wrapper'>
      {user ? userProfile() : <p>Profile not found</p>}
    </div >
  )

}
export default Profile
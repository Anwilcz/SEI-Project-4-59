import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getPayLoad, getTokenFromLocalStorage } from './helpers/auth'
import TileSmall from './TileSmall'
import 'animate.css'
// import { useNavigate } from 'react-router'


const Profile = () => {
  // const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [rerender, setRerender] = useState(false)
  const [imageUpload, setImageUpload] = useState(false)
  const [editProfile, setEditProfile] = useState(false)
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({
    slogan: '',
    location: '',
  })
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


  }, [user])

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
    setRerender(false)
  }, [search, rerender])

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

  // const redirect = (url) => {
  //   navigate(url, { replace: true })
  //   window.scrollTo(0, 0)
  // }

  const handleImageChanges = (event) => {
    setFile({ image: event.target.files[0] })
    const field = document.getElementById('file-chosen')
    field.innerText = event.target.files[0].name
  }

  const handleInputChanges = (event) => {
    // console.log({ [event.target.name]: event.target.value })
    setFormData({ ...formData, [event.target.name]: event.target.value })
    console.log(formData)
  }

  const handleSubmitImage = async (event) => {
    event.preventDefault()
    const data = new FormData()
    data.append('image', file['image'], file['image'].name)
    const favourited = { favourited: user.profile.favourited }
    console.log(data)
    try {
      console.log(file)
      await axios.put(`/api/profile/${user.username}/`, data,
        {
          headers: {
            'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': 'multipart/form-data; boundary=12345',
          },
        }
      )
      await axios.put(`/api/profile/${user.username}/`, favourited,
        {
          headers: {
            'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
          },
        }
      )
      setImageUpload(false)
      setRerender(true)
    } catch (err) {
      console.log(err)
      console.log(err.response)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put(`/api/profile/${user.username}/`, formData,
        {
          headers: {
            'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
          },
        }
      )
      setEditProfile(false)
      setRerender(true)
    } catch (err) {
      console.log(err)
      console.log(err.response)
    }
  }


  const addProfilePicture = (
    <div className='profile-section'>
      <form encType='multipart/form-data' onSubmit={(event) => {
        handleSubmitImage(event)
      }
      }>
        <label className='white normal bold' htmlFor="image">Browse</label>
        <div className='white light normal' id="file-chosen">No file chosen</div>
        <input onChange={(event) => {
          handleImageChanges(event)
        }} className='submit-button white normal bold' type="file" id="image" hidden name="image" accept="image/png, image/jpeg"></input>
        <button type='submit' className='submit-button white normal bold'>Submit</button>
      </form>
    </div>
  )


  const userProfile = () => {
    const favouritedLanguages = tools.languages.filter(tool => user.profile.favourited.includes(tool.id))
    const favouritedDatabases = tools.databases.filter(tool => user.profile.favourited.includes(tool.id))
    const favouritedWebframes = tools.webframes.filter(tool => user.profile.favourited.includes(tool.id))

    return (
      <div className='row margin-top-double'>
        <div className='column-300'>
          <div className='profile-image centered' style={{ backgroundImage: `url('/static${user['profile']['image']}')` }} />
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
              <button onClick={() => {
                setEditProfile(!editProfile)
              }} className='submit-button white normal bold'>Edit profile</button>
            </div>
            : null
          }
          <div className='profile-section'>
            <form onSubmit={(event) => {
              handleSubmit(event)
            }}>
              <p className='bold medium white'>Slogan: <span className='normal medium white'>{user['profile']['slogan']}</span></p>
              {editProfile ?

                <div>
                  <label className='hidden' htmlFor='slogan' ></label>
                  <input defaultValue={user.profile.slogan} className='input-field-dark white light normal' type='text' name='slogan' id='slogan' onChange={(event) => {
                    handleInputChanges(event)
                  }
                  }></input>
                </div>
                : null}

              <p className='bold medium white'>Location: <span className='normal medium white'>{user['profile']['location']}</span></p>
              {editProfile ?

                <div>
                  <label className='hidden' htmlFor='location'></label>
                  <input  defaultValue={user.profile.location} className='input-field-dark white light normal' type='text' name='location' id='location' onChange={(event) => {
                    handleInputChanges(event)
                  }
                  }></input>
                </div>

                : null}
              {editProfile ? <button type='submit' className='submit-button white normal bold'>Submit</button> : null}
            </form>
          </div>
        </div>
        <div className='column-fill content-wrapper'>
          <p className='bold medium white indented-2'>Favourite languages <span className='normal medium white'>({favouritedLanguages.length})</span></p>
          <div className='grid'>
            {(favouritedLanguages).map(tool => {
              return <TileSmall setRerender={setRerender} key={tool.name} tool={tool} />
            })}
          </div>
          <p className='bold medium white indented-2'>Favourite databases <span className='normal medium white'>({favouritedDatabases.length})</span></p>
          <div className='grid'>
            {(favouritedDatabases).map(tool => {
              return <TileSmall setRerender={setRerender} key={tool.name} tool={tool} />
            })}
          </div>
          <p className='bold medium white indented-2'>Favourite webframes <span className='normal medium white'>({favouritedWebframes.length})</span></p>
          <div className='grid'>
            {(favouritedWebframes).map(tool => {
              return <TileSmall setRerender={setRerender} key={tool.name} tool={tool} />
            })}
          </div>
        </div>
      </div >
    )
  }


  return (
    <div className='content-wrapper'>
      {user ? userProfile() : <p>Profile not found</p>}
    </div >
  )

}
export default Profile
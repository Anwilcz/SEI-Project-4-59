import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Tile from './Tile'

const Tools = () => {
  const [tools, setTools] = useState({ languages: [], databases: [], webframes: [] })
  const [user, setUser] = useState(null)

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
  console.log(tools)

  useEffect(() => {
    const getUser = async () => {
      try {
        const username = localStorage.getItem('username')
        const { data } = await axios.get(`/api/profile/${username}/`)
        setUser(data)
      } catch (err) {
        console.log(err)
        setUser(null)
      }
    }
    getUser()
  }, [])

  return (
    <div className='content-wrapper'>
      <section>
        <h2 className='medium white large indented'>Languages <span className='light big'>({tools.languages.length})</span></h2>
        <div className='grid'>
          {(tools.languages).map(tool => {
            return <Tile favourited={user ? user.profile.favourited : []} key={tool.name} tool={tool} />
          })}
        </div>
      </section>
      <section>
        <h2 className='medium white large indented'>Databases <span className='light big'>({tools.databases.length})</span></h2>
        <div className='grid'>
          {tools.databases.map(tool => {
            return <Tile favourited={user ? user.profile.favourited : []} key={tool.name} tool={tool} />
          })}
        </div>
      </section>
      <section >
        <h2 className='medium white large indented'>Webframes <span className='light big'>({tools.webframes.length})</span></h2>
        <div className='grid'>
          {tools.webframes.map(tool => {
            return <Tile favourited={user ? user.profile.favourited : []}key={tool.name} tool={tool} />
          })}
        </div>
      </section>
    </div>
  )
}

export default Tools


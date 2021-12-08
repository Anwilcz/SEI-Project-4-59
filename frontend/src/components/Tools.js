import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Tile from './Tile'
import NewChart from './NewChart'

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

  const sortArray = (array, key) => {
    const sorted = array.sort((a, b) => a[key] - b[key])
    return sorted
  }

  const createChart = (key, category, type) => {
    const x = []
    const y = []
    const sorted = sortArray(tools[category], 'worked_with')
    sorted.forEach(tool => {
      x.push(tool[key])
      y.push(tool.name)
    })
    console.log('function runnind', x)
    console.log('function runnind', y)
    return (
      <NewChart x={x} y={y} width={1200} height={2300} type={type} />
    )
  }


  return (
    <div className='content-wrapper'>
      <div className='chart'>
        {tools.languages.length ? createChart('worked_with', 'languages', 'all') : <p>Waitinggg</p>}
      </div>
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
            return <Tile favourited={user ? user.profile.favourited : []} key={tool.name} tool={tool} />
          })}
        </div>
      </section>
    </div>
  )
}

export default Tools


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Tile from './Tile'
import NewChart from './NewChart'
import 'animate.css'

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

  const createChart = (key, category, type, height, divId) => {
    const x = []
    const y = []
    const sorted = sortArray(tools[category], 'worked_with')
    sorted.forEach(tool => {
      x.push(tool[key])
      y.push(tool.name)
    })
    return (
      <NewChart x={x} y={y} type={type} height={height} divId={divId} />
    )
  }


  return (
    <div>
      <div className='hero' >
        <h1 className='hero-text-home indented'>2021 Insights</h1>
        <div className='hero-categories'>
          <a href='#languages' className='hero-button big white'>Languages </a>
          <a href='#databases' className='hero-button big white'>Databases </a>
          <a href='#webframes' className='hero-button big white'>Webframes </a>
        </div>
      </div>
      <div className='content-wrapper'>
        <h2 className='bold white header-size indented margin-bottom' id='languages'>Languages</h2>
        <h2 className='medium white big indented margin-top'>The popularity of selected programming languages among <span className='light-blue'>83.439</span> surveyed developers who have experience in working with a certain tool.</h2>
        <p className='light white normal indented'>Professional developers: 59390, Students, coding primarily as a hobby &#38; others: 24049</p>
        <div id='chart-1' />
        {tools.languages.length ? createChart('worked_with', 'languages', 'all', 2300, 'chart-1') : null}
        {tools.languages.length ?
          <div>
            <h2 className='bold white large indented'>All languages <span className='light large'>({tools.languages.length})</span></h2>
            <div className='grid margin-bottom-section'>
              {(tools.languages).map(tool => {
                return <Tile favourited={user ? user.profile.favourited : []} key={tool.name} tool={tool} />
              })}
            </div>
          </div>
          :
          <h2 className='medium white small indented margin-top'>Languages data loading, please wait..</h2>
        }

        <h2 className='bold white header-size indented margin-top' id='databases'>Databases</h2>
        <h2 className='medium white big indented margin-top'>The popularity of selected databases among <span className='light-blue'>83.439</span> surveyed developers who have experience in working with a certain tool.</h2>
        <p className='light white normal indented'>Professional developers: 59390, Students, coding primarily as a hobby &#38; others: 24049</p>
        <div id='chart-2' />
        {tools.databases.length ? createChart('worked_with', 'databases', 'all', 1000, 'chart-2') : null}
        {tools.databases.length ?
          <div>
            <h2 className='bold white large indented'>All databases <span className='light large'>({tools.databases.length})</span></h2>
            <div className='grid margin-bottom-section'>
              {tools.databases.map(tool => {
                return <Tile favourited={user ? user.profile.favourited : []} key={tool.name} tool={tool} />
              })}
            </div>
          </div>
          :
          <h2 className='medium white small indented'>Databases data loading, please wait..</h2>
        }

        <h2 className='bold white header-size indented margin-top' id='webframes'>Webframes</h2>
        <h2 className='medium white big indented margin-top'>The popularity of selected webframes among <span className='light-blue'>83.439</span> surveyed developers who have experience in working with a certain tool.</h2>
        <p className='light white normal indented'>Professional developers: 59390, Students, coding primarily as a hobby &#38; others: 24049</p>
        <div id='chart-3' />
        {tools.languages.length ? createChart('worked_with', 'webframes', 'all', 1150, 'chart-3') : null}
        {tools.languages.length ?
          <div >
            <h2 className='bold white large indented'>All webframes <span className='light large'>({tools.webframes.length})</span></h2>
            <div className='grid margin-bottom-section'>
              {tools.webframes.map(tool => {
                return <Tile favourited={user ? user.profile.favourited : []} key={tool.name} tool={tool} />
              })}
            </div>
          </div>
          :
          <h2 className='medium white small indented'>Webframes data loading, please wait..</h2>
        }



      </div>
    </div>
  )
}

export default Tools


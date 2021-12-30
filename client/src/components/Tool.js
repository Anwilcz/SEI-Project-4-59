import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { addFavourites } from './helpers/favourited'
import NewChartEmployment from './NewChartEmployment'
import NewChartCompanySize from './NewChartCompanySize'
import NewChartCountry from './NewChartCountry'
import 'animate.css'
import NewPieChart from './NewPieChart'

const Tool = () => {
  const [tool, setTool] = useState(null)
  const [user, setUser] = useState(null)
  const params = useParams()
  const id = params.id
  const devsData = { pro: 59390, other: 24049, all: 83439 }
  console.log(id)
  const { search } = window.location
  const name = new URLSearchParams(search).get('name')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/tools/${id}/`) // * <-- replace with your endpoint
        setTool(data)

      } catch (err) {
        console.log(err)
      }

    }
    getData()

  }, [id])

  const convertUrl = (tool) => {
    let url = tool.image
    if (url.includes('https://cdn.jsdelivr.net/')) {
      url = url.toLowerCase()
    }
    return url
  }

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

  const sortArray = (array, index) => {
    const sorted = array.sort((a, b) => b[index] - a[index])
    return sorted
  }

  const findOS = (tool, cat) => {
    let choices = new Array
    let total = new Number
    if (cat === 'professional') {
      choices = [['Windows', tool.windows_prof_dev], ['Linux', tool.linux_prof_dev], ['Mac OS', tool.mac_os_prof_dev]]
      total = tool.windows_prof_dev + tool.linux_prof_dev + tool.mac_os_prof_dev
    }
    if (cat === 'other') {
      choices = [['Windows', tool.windows_others], ['Linux', tool.linux_others], ['Mac OS', tool.mac_os_others]]
      total = tool.windows_others + tool.linux_others + tool.mac_os_others
    }
    const sorted = sortArray(choices, 1)
    return <h2 className='quote medium white big'><span className='light-blue'>{sorted[0][1]}</span> out of {total}, <span className='light-blue'>{((sorted[0][1] / total) * 100).toFixed(1)}%</span> surveyed {cat} developers chose <span className='light-blue'>{sorted[0][0]}</span>.</h2>
  }

  const loadingData = (
    <h2 className='light light-grey normal indented margin-top'>{name} data loading, please wait..</h2>
  )

  return (
    <div>
      <div className='hero' >
        <div className='row'>
          {tool ? <img className='hero-logo' src={convertUrl(tool)} /> : null}
          <h1 className='hero-text'>{name}</h1>
        </div>
        <div className='hero-categories indented'>
          {user ? <div className={user.profile.favourited.includes(id) ? 'heart-big favourited' : 'heart-big'} id={id} onClick={(event) => {
            addFavourites(event)
          }} /> : <div className='heart-big'/>}
          <a href='#worked-with' className='hero-button big white'> Worked with {name}</a>
          <a href='#want-to-work-with' className='hero-button big white'>Want to work with {name}</a>
  
        </div>
      </div>
      <div className='content-wrapper'>
        <h2 className='bold white header-size indented'><span className='light-blue'>{name}</span> developers pofile</h2>
        <h2 className='medium white big margin-bottom indented'>What do we know about the global community of {name} developers?</h2>

        <h2 id='worked-with' className='bold white header-size indented margin-top-0'>Those who have worked with <span className='light-blue'>{name}</span> before are...</h2>
        {tool ? <h2 className='bold white header-size margin-bottom-section indented margin-top-0'><span className='light-blue'>{tool.worked_with}</span> out of {devsData.all}, <span className='light-blue'>{((tool.worked_with / devsData.all) * 100).toFixed(1)}%</span> surveyed developers.</h2> : loadingData}
        <div className='row margin-bottom-section'>
          <div className='column-half'>
            {tool ?
              <div>
                <h2 className='bold white large'>Professional developers</h2>
                <h2 className='quote medium white big'><span className='light-blue'>{tool.worked_with_prof_devs}</span> out of {devsData.pro}, <span className='light-blue'>{((tool.worked_with_prof_devs / devsData.pro) * 100).toFixed(1)}%</span> surveyed professional developers worked with {name}.</h2>
              </div>
              : null}



          </div>
          <div className='column-half'>
            {tool ?
              <div>
                <h2 className='bold white large'>Other developers</h2>
                <h2 className='quote medium white big'><span className='light-blue'>{tool.worked_others}</span> out of {devsData.other}, <span className='light-blue'>{((tool.worked_others / devsData.other) * 100).toFixed(1)}%</span> surveyed students/ non-professional developers worked with {name}.</h2>
              </div>
              : null}
          </div>
        </div>


        <h2 id='employment' className='bold white header-size indented'>Employment type</h2>
        <h2 className='medium white big margin-bottom indented'>What is the current employment status of experienced <span className='light-blue'>{name}</span> software developers?</h2>
        <div id='employment-worked-with' className='row margin-bottom-section'>

          {tool ? <NewChartEmployment tool={tool} height={480} divId={'employment-worked-with'} /> : loadingData}

        </div>


        <h2 id='company' className='bold white header-size indented'>Company size</h2>
        <h2 className='medium white big margin-bottom indented'>What size is the business where experienced <span className='light-blue'>{name}</span> software developers work?</h2>
        <div id='company-worked-with' className='row margin-bottom-section'>

          {tool ? <NewChartCompanySize tool={tool} height={600} divId={'company-worked-with'} /> : loadingData}



        </div>


        <h2 id='country' className='bold white header-size indented'>Country</h2>
        <h2 className='medium white big margin-bottom indented'>Where <span className='light-blue'>{name}</span> is the most popular among experienced software developers?</h2>
        <div id='country-worked-with' className='row margin-bottom-section'>

          {tool ? <NewChartCountry tool={tool} height={600} divId={'country-worked-with'} /> : loadingData}

        </div>







        {/* Who want to work with tool  */}


        <h2 id='want-to-work-with' className='bold white header-size indented margin-top-0'>And, those who are willing to work with <span className='light-blue'>{name}</span> in the future are...</h2>
        {tool ? <h2 className='bold white header-size margin-bottom-section indented margin-top-0'><span className='light-blue'>{tool.wants_to_work_with}</span> out of {devsData.all}, <span className='light-blue'>{((tool.wants_to_work_with / devsData.all) * 100).toFixed(1)}%</span> surveyed developers.</h2> : null}
        <div className='row margin-bottom-section'>
          <div className='column-half'>
            {tool ?
              <div>
                <h2 className='bold white large'>Professional developers</h2>
                <h2 className='quote medium white big'><span className='light-blue'>{tool.wants_to_work_with_prof_devs}</span> out of {devsData.pro}, <span className='light-blue'>{((tool.wants_to_work_with_prof_devs / devsData.pro) * 100).toFixed(1)}%</span> surveyed professional developers want to work with {name}.</h2>
              </div>
              : loadingData}



          </div>
          <div className='column-half'>
            {tool ?
              <div>
                <h2 className='bold white large'>Other developers</h2>
                <h2 className='quote medium white big'><span className='light-blue'>{tool.wants_to_work_with_others}</span> out of {devsData.other}, <span className='light-blue'>{((tool.wants_to_work_with_others / devsData.other) * 100).toFixed(1)}%</span> surveyed students/ non-professional developers want to work with {name}.</h2>
              </div>
              : loadingData}
          </div>
        </div>


        <h2 id='employment' className='bold white header-size indented'>Employment type</h2>
        <h2 className='medium white big margin-bottom indented'>What is the current employment status of future <span className='light-blue'>{name}</span> software developers?</h2>
        <div id='employment-want-to-work-with' className='row margin-bottom-section'>

          {tool ? <NewChartEmployment tool={tool} height={480} divId={'employment-want-to-work-with'} /> : loadingData}

        </div>


        <h2 id='company' className='bold white header-size indented'>Company size</h2>
        <h2 className='medium white big margin-bottom indented'>What size is the business where future <span className='light-blue'>{name}</span> software developers work?</h2>
        <div id='company-want-to-work-with' className='row margin-bottom-section'>

          {tool ? <NewChartCompanySize tool={tool} height={600} divId={'company-want-to-work-with'} /> : loadingData}



        </div>


        <h2 id='country' className='bold white header-size indented'>Country</h2>
        <h2 className='medium white big margin-bottom indented'>Where <span className='light-blue'>{name}</span> is the most popular among future {name} software developers?</h2>
        <div id='country-want-to-work-with' className='row margin-bottom-section'>

          {tool ? <NewChartCountry tool={tool} height={600} divId={'country-want-to-work-with'} /> : loadingData}

        </div>





        {/* Operating system */}


        <h2 id='os' className='bold white header-size indented'>Operating System</h2>
        <h2 className='medium white big margin-bottom indented'>What is the most popular <span className='light-blue'>Operating System</span> of choice for <span className='light-blue'>{name}</span> software developers?</h2>
        <div className='row margin-bottom-section'>
          <div className='column-half'>

            <div>
              <h2 className='bold white large'>Professional developers</h2>
              {tool ? findOS(tool, 'professional') : null}
              <div id='os-profesional'>

                {tool ? <NewPieChart tool={tool} divId={'os-profesional'} /> : loadingData}

              </div>
            </div>

          </div>
          <div className='column-half'>

            <div>
              <h2 className='bold white large'>Other developers</h2>
              {tool ? findOS(tool, 'other') : null}

              <div id='os-other'>
                {tool ? <NewPieChart tool={tool} divId={'os-other'} /> : loadingData}
              </div>
            </div>

          </div>
        </div>




      </div>
    </div >
  )
}

export default Tool


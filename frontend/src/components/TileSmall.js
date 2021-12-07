import React from 'react'

const TileSmall = ({ tool }) => {

  let url = (tool.image)
  
  if (url.includes('https://cdn.jsdelivr.net/')) {
    console.log('yessss')
    url = url.toLowerCase()
  }


  return (
    <div className='tile tile-small'>
      <div className='tile-label'>{tool.name}
        <div className='favourite'/>
      </div>
      <img className='tile-content' src={url} />
    </div>
  )
}

export default TileSmall


import React from 'react'
import { addFavourites } from './helpers/favourited'

const TileSmall = ({ tool, setRerender }) => {

  let url = (tool.image)

  if (url.includes('https://cdn.jsdelivr.net/')) {
    console.log('yessss')
    url = url.toLowerCase()
  }


  return (
    <div className='tile tile-small' id={tool.name}>
      <div className='tile-label'>{tool.name}
        <div className='close' id={tool.id} onClick={(event) => {
          addFavourites(event, setRerender)
        }} />
      </div>
      <img className='tile-content' src={url} />
    </div>
  )
}

export default TileSmall


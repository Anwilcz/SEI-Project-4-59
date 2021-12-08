import React from 'react'
import { addFavourites } from './helpers/favourited'

const Tile = ({ tool, favourited }) => {

  let url = (tool.image)

  if (url.includes('https://cdn.jsdelivr.net/')) {
    console.log('yessss')
    url = url.toLowerCase()
  }

  return (
    <div className='tile' id={tool.name}>
      <div className={ favourited.includes(tool.id) ? 'heart favourited' : 'heart'} id={tool.id} onClick={(event) => {
        addFavourites(event)
      }} />
      <div className='tile-label'>{tool.name}
      </div>
      <img className='tile-content' src={url} />
    </div>
  )
}

export default Tile


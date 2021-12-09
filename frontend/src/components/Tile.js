import React from 'react'
import { addFavourites } from './helpers/favourited'
import { Link } from 'react-router-dom'

const Tile = ({ tool, favourited }) => {

  let url = (tool.image)

  if (url.includes('https://cdn.jsdelivr.net/')) {
    url = url.toLowerCase()
  }

  return (
    <div className='tile' id={tool.name}>
      <div className={favourited.includes(tool.id) ? 'heart favourited' : 'heart'} id={tool.id} onClick={(event) => {
        addFavourites(event)
      }} />
      <Link onClick={() => {
        window.scrollTo(0, 0)
      }}className='tile-label' to={`/tool/${tool.id}?name=${tool.name}`} >
        {tool.name}
      </Link>
      <img className='tile-content' src={url} />
    </div>
  )
}

export default Tile


import React from 'react'
import { addFavourites } from './helpers/favourited'
import { Link } from 'react-router-dom'

const TileSmall = ({ tool, setRerender }) => {

  let url = (tool.image)

  if (url.includes('https://cdn.jsdelivr.net/')) {
    url = url.toLowerCase()
  }


  return (
    <div className='tile tile-small' id={tool.name}>
      <div className='close' id={tool.id} onClick={(event) => {
        addFavourites(event, setRerender)
      }} />
      <Link onClick={() => {
        window.scrollTo(0, 0)
      }} className='tile-label' to={`/tool/${tool.id}?name=${tool.name}`} >{tool.name}
      </Link>
      <img className='tile-content' src={url} />
    </div >
  )
}

export default TileSmall


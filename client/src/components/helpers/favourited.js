import { getTokenFromLocalStorage } from './auth'
import axios from 'axios'

export const addFavourites = async (event, setRerender) => {
  const username = localStorage.getItem('username')
  if (username) {
    try {
      const { data } = await axios.get(`/api/profile/${username}/`)
      const user = data
      const favourited = user.profile.favourited
      let newFavourited = new Array
      const toolId = Number(event.target.id)
      if (!favourited.includes(toolId)) {
        newFavourited = [...favourited, toolId]
        event.target.classList.add('favourited') 
      } else {
        newFavourited = favourited.filter(id => id !== toolId)
        event.target.classList.remove('favourited') 
      }
      await axios.put(`/api/profile/${username}/`, { 'favourited': newFavourited },
        {
          headers: {
            'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
          },
        }
      )
      setRerender(true)
    } catch (err) {
      // console.log(err)
      // console.log(err.response)
    }
  }
}
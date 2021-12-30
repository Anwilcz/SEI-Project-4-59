import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Tool from './components/Tool'
import AllUsers from './components/AllUsers'

import Tools from './components/Tools'


const App = () => {


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Tools/>} />
        <Route path='/profile/:username' element={<Profile/>} />
        <Route path='/profiles' element={<AllUsers/>} />
        <Route path='/tool/:id' element={<Tool />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
// import Home from './components/Home'
import Tools from './components/Tools'
// import Databases from './components/Databases'
// import Webframes from './components/Webframes'
// import axios from 'axios'

const App = () => {


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Tools/>} />
        {/* <Route exact path='/' component={Languages} />
        <Route exact path='/' component={Databases} />
        <Route exact path='/' component={Webframes} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Home'

import AllUsers from './User/List'
import Profile from './User/Profile'
import AddUser from './User/Add'
import UpdateUser from './User/Update'

import UserProvider from './UsersContext'


function App() {
  return <>
    <div style={{ fontFamily: 'sans-serif' }}>
      <Router>
        <Navbar />
        <UserProvider>
          <Routes>
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/update/:username" element={<UpdateUser />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  </>
}

export default App

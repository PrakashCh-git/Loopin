
import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import Login from './pages/Login'
import Feed from './pages/Feed'
import Messages from './pages/Messages'
import ChatBox from './pages/ChatBox'
import Discover from './pages/Discover'
import Connections from './pages/Connections'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import Layout from './pages/Layout'
import Loading from './components/Loading'
import {Toaster} from 'react-hot-toast'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const [user,setUser] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true)

      try {
        const response = await axios.get(
          'https://loopin-1-9u8u.onrender.com/api/auth/get-me',
          { withCredentials: true }
        )
        setUser(response.data.user)
        setIsAuthenticated(true)
        
      } catch {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [location.pathname])

  if (loading) return <div><Loading/></div>

  return (
    <>
    <Toaster/>
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to="/" replace />
            : <Login setIsAuthenticated={setIsAuthenticated}/>
        }
      />

      <Route
        path="/"
        element={
          isAuthenticated
            ? <Layout setIsAuthenticated={setIsAuthenticated} />
            : <Navigate to="/login" replace />
        }
      >
        <Route index element={<Feed />} />
        <Route path="messages" element={<Messages />} />
        <Route path="messages/:userId" element={<ChatBox />} />
        <Route path="discover" element={<Discover />} />
        <Route path="connections" element={<Connections />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/:profileId" element={<Profile />} />
        <Route path="create-post" element={<CreatePost />} />
      </Route>
    </Routes>
    </>
  )
}

export default App

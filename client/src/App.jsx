import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './features/authentication/pages/Login'
import Feed from './features/feed/pages/Feed'
import Messages from './features/messages/pages/Messages'
import ChatBox from './features/messages/pages/ChatBox'
import Discover from './features/feed/pages/Discover'
import Connections from './features/feed/pages/Connections'
import Profile from './features/profile/pages/Profile'
import CreatePost from './features/feed/pages/CreatePost'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}>
          <Route index element={<Feed/>}/>
          <Route path='messages' element={<Messages/>}/>
          <Route path='messages/:userId' element={<ChatBox/>}/>
          <Route path='discover' element={<Discover/>}/>
          <Route path='connections' element={<Connections/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='profile/:profileId' element={<Profile/>}/>
          <Route path='create-post' element={<CreatePost/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App


import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './store/authStore'

import AppShell from './components/layout/AppShell'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Explore from './pages/Explore'
import PostView from './pages/PostView'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <Navigate to="/feed" replace /> : children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        {/* Protected — inside AppShell */}
        <Route element={<PrivateRoute><AppShell /></PrivateRoute>}>
          <Route path="/feed"          element={<Feed />} />
          <Route path="/explore"       element={<Explore />} />
          <Route path="/post/:id"      element={<PostView />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

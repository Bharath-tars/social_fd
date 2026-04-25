import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import RightPanel from './RightPanel'

export default function AppShell() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', maxWidth: 1200, margin: '0 auto' }}>
      <Sidebar />
      <main style={{ flex: 1, minWidth: 0, borderRight: '1px solid var(--og-border)' }}>
        <Outlet />
      </main>
      <RightPanel />
    </div>
  )
}

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TaskList from '@/components/tasks/TaskList'

export default function HomePage(): React.JSX.Element {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <TaskList />
      </main>
      <Footer />
    </div>
  )
}
import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EnhancedHero from '@/components/ui/EnhancedHero'
import TaskList from '@/components/tasks/TaskList'

export default function HomePage(): React.JSX.Element {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <EnhancedHero />
        <div style={{ padding: '4rem 0' }}>
          <TaskList />
        </div>
      </main>
      <Footer />
    </div>
  )
}
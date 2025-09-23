import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EnhancedHero from '@/components/ui/EnhancedHero'
import TaskList from '@/components/tasks/TaskList'
import ScrollAnimatedSection from '@/components/ui/ScrollAnimatedSection'

export default function HomePage(): React.JSX.Element {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <EnhancedHero />
        
        <ScrollAnimatedSection 
          animation="slideUp" 
          delay={0.2}
          className="tasks-section"
        >
          <div style={{ padding: '4rem 0' }}>
            <TaskList />
          </div>
        </ScrollAnimatedSection>
      </main>
      
      <ScrollAnimatedSection animation="fade" delay={0.3}>
        <Footer />
      </ScrollAnimatedSection>
    </div>
  )
}
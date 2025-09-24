import React from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EnhancedHero from '@/components/ui/EnhancedHero'
import TaskList from '@/components/tasks/TaskList'
import ScrollAnimatedSection from '@/components/ui/ScrollAnimatedSection'
import styles from './HomePage.module.scss'

export default function HomePage(): React.JSX.Element {
  return (
    <div className={styles.homePage}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <EnhancedHero />
        </section>
        
        <ScrollAnimatedSection 
          animation="slideUp" 
          delay={0.2}
          className={styles.tasksSection}
        >
          <div className={styles.taskContainer}>
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
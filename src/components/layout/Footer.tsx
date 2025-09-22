'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './Footer.module.scss'

interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps): React.JSX.Element {
  const currentYear: number = new Date().getFullYear()

  return (
    <motion.footer 
      className={`${styles.footer} ${className || ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container">
        <div className={styles.content}>
          <p className={styles.text}>
            © {currentYear} TaskFlow. Built with ❤️ and Next.js
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
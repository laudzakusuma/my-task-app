'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiCheckSquare, FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi'
import styles from './Footer.module.scss'

interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps): React.JSX.Element {
  return (
    <motion.footer 
      className={`${styles.footer} ${className || ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.logo}>
              <FiCheckSquare className={styles.logoIcon} />
              <span className={styles.logoText}>TaskFlow</span>
            </div>
            <p className={styles.description}>
              Streamline your productivity with our modern task management platform.
            </p>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Product</h3>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.link}>Features</a></li>
              <li><a href="#" className={styles.link}>Pricing</a></li>
              <li><a href="#" className={styles.link}>API</a></li>
              <li><a href="#" className={styles.link}>Documentation</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Company</h3>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.link}>About</a></li>
              <li><a href="#" className={styles.link}>Careers</a></li>
              <li><a href="#" className={styles.link}>Contact</a></li>
              <li><a href="#" className={styles.link}>Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; 2025 TaskFlow. All rights reserved.
          </p>
          <div className={styles.socialLinks}>
            <a 
              href="#" 
              className={styles.socialLink}
              aria-label="Twitter"
            >
              <FiTwitter />
            </a>
            <a 
              href="#" 
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a 
              href="#" 
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
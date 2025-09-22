'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import Button from './Button'
import styles from './Modal.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  className?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = ''
}: ModalProps): React.JSX.Element | null {
  
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const overlayVariants = {
    hidden: { 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const handleOverlayClick = (event: React.MouseEvent): void => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  const modalClasses = [
    styles.modal,
    styles[size],
    className
  ].filter(Boolean).join(' ')

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.portal}>
          <motion.div
            className={styles.overlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleOverlayClick}
          >
            <motion.div
              className={modalClasses}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
            >
              {(title || showCloseButton) && (
                <div className={styles.header}>
                  {title && (
                    <h2 id="modal-title" className={styles.title}>
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<FiX />}
                      onClick={onClose}
                      className={styles.closeButton}
                      aria-label="Close modal"
                    >
                      {/* Empty children to satisfy TypeScript */}
                      <span className="visually-hidden">Close</span>
                    </Button>
                  )}
                </div>
              )}
              
              <div className={styles.content}>
                {children}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
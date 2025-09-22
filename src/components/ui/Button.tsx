'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import styles from './Button.module.scss'

interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
  children?: React.ReactNode // Make children optional
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  onClick?: () => void
  'aria-label'?: string // Add aria-label prop
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  ...motionProps
}: ButtonProps): React.JSX.Element {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    },
    loading: {
      scale: 1,
      transition: { duration: 0.2 }
    }
  }

  const iconVariants = {
    initial: { x: 0 },
    hover: {
      x: iconPosition === 'right' ? 4 : -4,
      transition: { duration: 0.2 }
    }
  }

  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    loading ? styles.loading : '',
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ')

  const handleClick = (): void => {
    if (!disabled && !loading && onClick) {
      onClick()
    }
  }

  // If only icon and no children, render as icon button
  if (icon && !children) {
    return (
      <motion.button
        className={buttonClasses}
        variants={buttonVariants}
        initial="initial"
        whileHover={!disabled && !loading ? "hover" : "initial"}
        whileTap={!disabled && !loading ? "tap" : "initial"}
        animate={loading ? "loading" : "initial"}
        disabled={disabled || loading}
        onClick={handleClick}
        {...motionProps}
      >
        {loading ? (
          <span className={styles.spinner} />
        ) : (
          <motion.span 
            className={styles.icon}
            variants={iconVariants}
          >
            {icon}
          </motion.span>
        )}
      </motion.button>
    )
  }

  return (
    <motion.button
      className={buttonClasses}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled && !loading ? "hover" : "initial"}
      whileTap={!disabled && !loading ? "tap" : "initial"}
      animate={loading ? "loading" : "initial"}
      disabled={disabled || loading}
      onClick={handleClick}
      {...motionProps}
    >
      {icon && iconPosition === 'left' && (
        <motion.span 
          className={styles.icon}
          variants={iconVariants}
        >
          {icon}
        </motion.span>
      )}
      
      <span className={styles.content}>
        {loading ? (
          <span className={styles.spinner} />
        ) : (
          children
        )}
      </span>

      {icon && iconPosition === 'right' && (
        <motion.span 
          className={styles.icon}
          variants={iconVariants}
        >
          {icon}
        </motion.span>
      )}
    </motion.button>
  )
}
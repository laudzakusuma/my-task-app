'use client'

import React, { useRef, useEffect } from 'react'
import styles from './VideoBackground.module.scss'

interface VideoBackgroundProps {
  src: string
  poster?: string
  overlay?: boolean
  muted?: boolean
  children?: React.ReactNode
}

export default function VideoBackground({ 
  src, 
  poster, 
  overlay = true,
  muted = true,
  children 
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(console.error)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = muted
    }
  }, [muted])

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        muted={muted}
        loop
        playsInline
        poster={poster}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {overlay && <div className={styles.overlay} />}
      
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
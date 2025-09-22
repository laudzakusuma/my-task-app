'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Hero, Card, Button, Modal } from '@/components/ui'
import { FiPlus, FiStar, FiHeart, FiZap } from 'react-icons/fi'

export default function HomePage(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [loadingButton, setLoadingButton] = useState<string | null>(null)

  const handleButtonClick = (buttonId: string): void => {
    setLoadingButton(buttonId)
    // Simulate API call
    setTimeout(() => {
      setLoadingButton(null)
    }, 2000)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Hero onGetStarted={() => setIsModalOpen(true)} />
        
        <section id="components-demo" style={{ padding: '4rem 0' }}>
          <div className="container">
            <h2 style={{ 
              textAlign: 'center', 
              marginBottom: '3rem',
              fontSize: 'var(--font-size-3xl)',
              fontWeight: '700',
              color: 'var(--color-text)'
            }}>
              Demo Komponen Animasi
            </h2>

            {/* Card Demo */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <Card variant="default">
                <div style={{ textAlign: 'center' }}>
                  <FiStar style={{ fontSize: '2rem', color: 'var(--color-accent)', marginBottom: '1rem' }} />
                  <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>Default Card</h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    Card dengan shadow standar dan animasi hover yang halus
                  </p>
                </div>
              </Card>

              <Card variant="elevated" padding="lg">
                <div style={{ textAlign: 'center' }}>
                  <FiHeart style={{ fontSize: '2rem', color: 'var(--color-accent)', marginBottom: '1rem' }} />
                  <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>Elevated Card</h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    Card dengan shadow yang lebih prominent dan padding besar
                  </p>
                </div>
              </Card>

              <Card variant="outlined" hoverable={false}>
                <div style={{ textAlign: 'center' }}>
                  <FiZap style={{ fontSize: '2rem', color: 'var(--color-accent)', marginBottom: '1rem' }} />
                  <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>Outlined Card</h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    Card dengan border outline dan tanpa hover effect
                  </p>
                </div>
              </Card>
            </div>

            {/* Button Demo */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '3rem'
            }}>
              <Button 
                variant="primary" 
                icon={<FiPlus />}
                loading={loadingButton === 'primary'}
                onClick={() => handleButtonClick('primary')}
              >
                Primary Button
              </Button>

              <Button 
                variant="secondary"
                loading={loadingButton === 'secondary'}
                onClick={() => handleButtonClick('secondary')}
              >
                Secondary Button
              </Button>

              <Button 
                variant="outline"
                icon={<FiStar />}
                iconPosition="right"
                loading={loadingButton === 'outline'}
                onClick={() => handleButtonClick('outline')}
              >
                Outline Button
              </Button>

              <Button 
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(true)}
              >
                Open Modal
              </Button>

              <Button variant="primary" disabled>
                Disabled Button
              </Button>
            </div>
          </div>
        </section>

        <section id="tasks-section" style={{ padding: '2rem 0' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
              Tasks CRUD akan dibangun di milestone selanjutnya...
            </h2>
          </div>
        </section>
      </main>
      <Footer />

      {/* Modal Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Selamat Datang di TaskFlow!"
        size="md"
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
            Ini adalah demo modal dengan animasi entrance dan exit yang smooth. 
            Modal ini responsive dan dapat ditutup dengan tombol ESC, klik overlay, 
            atau tombol close.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Awesome!
            </Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
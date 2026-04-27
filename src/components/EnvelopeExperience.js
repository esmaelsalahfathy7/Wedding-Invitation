"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function EnvelopeExperience({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { t } = useLanguage();

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Wait for animation to finish then tell parent to reveal content
      setTimeout(() => {
        onComplete();
      }, 2500); // Time for paper sliding
    }
  };

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div
          className="envelope-wrapper"
          initial={{ opacity: 1 }}
          onClick={handleOpen}
          style={{
            cursor: isOpen ? 'default' : 'pointer',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: '100%'
          }}
        >
          {/* Ambient glow */}
          <div className="cinematic-glow"></div>

          <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* The Envelope container */}
            <motion.div
              style={{
                width: '320px',
                height: '200px',
                background: 'var(--envelope-bg)',
                borderRadius: '8px',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 2px rgba(255,255,255,0.1)'
              }}
              animate={{
                y: isOpen ? 150 : 0,
                // opacity: isOpen ? 0 : 1
              }}
              transition={{ duration: 1.5, delay: 2.5, ease: "easeInOut" }}
            >

              {/* The Paper Card sliding out */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '340px',
                  background: 'var(--card-bg)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 215, 0, 0.1)',
                  left: '20px',
                  bottom: '10px',
                  borderRadius: '4px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 -10px 30px rgba(0,0,0,0.5)',
                  zIndex: 1
                }}
                initial={{ y: 0 }}
                animate={{ y: isOpen ? -180 : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              >
                <motion.h3
                  style={{ color: 'var(--gold-accent)', fontSize: '0.9rem', letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase', fontFamily: 'var(--font-inter)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ delay: 1.2 }}
                >
                  {t('invited')}
                </motion.h3>
                <motion.h1
                  style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '1rem', color: '#fff' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ delay: 1.7 }}
                >
                  {t('names')}
                </motion.h1>
                <motion.p
                  style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '1.1rem', fontFamily: 'var(--font-playfair)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ delay: 2.2 }}
                >
                  {t('date')}
                </motion.p>
              </motion.div>

              {/* Envelope Front overlay to hide the bottom of the paper */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(30,30,30,1) 0%, rgba(20,20,20,1) 100%)',
                  borderRadius: '8px',
                  zIndex: 2,
                  clipPath: 'polygon(0 40%, 50% 70%, 100% 40%, 100% 100%, 0 100%)',
                  borderTop: '1px solid rgba(255,255,255,0.05)'
                }}
              />

              {/* Envelope Flap (Top) opening */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(35,35,35,1) 0%, rgba(25,25,25,1) 100%)',
                  borderRadius: '8px',
                  zIndex: isOpen ? 0 : 3, // drops behind paper when open
                  transformOrigin: 'top',
                  clipPath: 'polygon(0 0, 100% 0, 50% 50%)',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: isOpen ? 180 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />

              {/* Gold seal */}
              {!isOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #d4af37 0%, #aa8b2b 100%)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    zIndex: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-playfair)', color: '#2a220a', fontSize: '1.2rem' }}>{t('seal')}</span>
                </div>
              )}
            </motion.div>

            {!isOpen && (
              <motion.p
                style={{
                  position: 'absolute',
                  bottom: '-50px',
                  color: 'var(--text-secondary)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-inter)'
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t('tapToOpen')}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

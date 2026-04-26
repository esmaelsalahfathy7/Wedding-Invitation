"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveRSVP } from '../services/firebaseService';

export default function RSVP() {
  const [attending, setAttending] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || attending === null) return;
    setIsSubmitting(true);
    const res = await saveRSVP(name, attending, message);
    if (res.success) {
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <motion.div 
        className="section-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ color: 'var(--gold-accent)', marginBottom: '1rem', fontFamily: 'var(--font-playfair)' }}>Thank You</h2>
          <p style={{ color: 'var(--text-secondary)' }}>We have received your response.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="section-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
        Will you be there with us?
      </h2>

      <div className="glass-card" style={{ width: '100%', maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              type="button" 
              onClick={() => setAttending(true)}
              className="btn-gold" 
              style={{ 
                background: attending === true ? 'var(--gold-glow)' : 'transparent',
                borderColor: attending === true ? 'var(--gold-accent)' : 'rgba(255,255,255,0.2)',
                color: attending === true ? '#fff' : 'var(--text-secondary)'
              }}
            >
              Joyfully Attending
            </button>
            <button 
              type="button" 
              onClick={() => setAttending(false)}
              className="btn-gold" 
              style={{ 
                background: attending === false ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderColor: attending === false ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                color: attending === false ? '#fff' : 'var(--text-secondary)'
              }}
            >
              Regretfully Decline
            </button>
          </div>

          <AnimatePresence>
            {attending !== null && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
              >
                <div style={{ paddingTop: '1rem' }}>
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    className="input-dark" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <textarea 
                    placeholder={attending ? "Any dietary requirements or song requests?" : "Leave a message for the couple..."} 
                    className="input-dark" 
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ resize: 'none' }}
                  />
                  <button type="submit" className="btn-gold" disabled={isSubmitting || !name} style={{ width: '100%' }}>
                    {isSubmitting ? 'Sending...' : 'Confirm RSVP'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
}

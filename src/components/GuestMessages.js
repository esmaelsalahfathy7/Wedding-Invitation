"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CanvasDraw from './CanvasDraw';
import { saveMessage, getMessages } from '../services/firebaseService';

const DrawingViewer = ({ dataUrl }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (dataUrl && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, 300, 150);
        ctx.drawImage(img, 0, 0);
      };
      img.src = dataUrl;
    }
  }, [dataUrl]);
  return <canvas ref={canvasRef} width={300} height={150} style={{ width: '100%', height: 'auto', borderRadius: '4px', filter: 'drop-shadow(0 0 5px var(--gold-glow))' }} />
};

export default function GuestMessages() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [drawing, setDrawing] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await getMessages();
    if (res.success) {
      setMessages(res.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || (!text && !drawing)) return;
    setIsSubmitting(true);
    const res = await saveMessage(name, text, drawing);
    if (res.success) {
      setName('');
      setText('');
      setDrawing(null);
      setShowCanvas(false);
      fetchMessages();
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div 
      className="section-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        Words of Love
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', textAlign: 'center', maxWidth: '600px' }}>
        Leave a note or a handwritten message for us to cherish.
      </p>

      <div className="glass-card" style={{ width: '100%', maxWidth: '600px', marginBottom: '4rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input 
            type="text" 
            placeholder="Your Name" 
            className="input-dark" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {!showCanvas ? (
            <>
              <textarea 
                placeholder="Write your message..." 
                className="input-dark" 
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ resize: 'none' }}
              />
              <button type="button" onClick={() => setShowCanvas(true)} style={{ background: 'none', border: 'none', color: 'var(--gold-accent)', cursor: 'pointer', textDecoration: 'underline', marginBottom: '1rem', alignSelf: 'flex-start', fontFamily: 'var(--font-inter)' }}>
                Switch to handwritten note
              </button>
            </>
          ) : (
            <div style={{ marginBottom: '1rem' }}>
              <CanvasDraw onSave={(dataUrl) => setDrawing(dataUrl)} onClear={() => setDrawing(null)} />
              {drawing && <p style={{ color: 'var(--gold-accent)', fontSize: '0.8rem', textAlign: 'center', marginTop: '0.5rem' }}>Drawing ready to submit!</p>}
              <button type="button" onClick={() => { setShowCanvas(false); setDrawing(null); }} style={{ background: 'none', border: 'none', color: 'var(--gold-accent)', cursor: 'pointer', textDecoration: 'underline', alignSelf: 'flex-start', marginTop: '1rem', fontFamily: 'var(--font-inter)' }}>
                Switch to typed message
              </button>
            </div>
          )}
          
          <button type="submit" className="btn-gold" disabled={isSubmitting || (!name || (!text && !drawing))}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '800px' }}>
        {messages.map((msg, idx) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: '1.5rem', alignSelf: idx % 2 === 0 ? 'flex-start' : 'flex-end', width: '80%' }}
          >
            <h4 style={{ color: 'var(--gold-accent)', marginBottom: '0.5rem', fontFamily: 'var(--font-playfair)', fontSize: '1.2rem' }}>{msg.name}</h4>
            {msg.text && <p style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>{msg.text}</p>}
            {msg.drawing && (
              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '1rem', marginTop: '1rem' }}>
                <DrawingViewer dataUrl={msg.drawing} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

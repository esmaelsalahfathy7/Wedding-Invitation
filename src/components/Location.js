"use client";
import { motion } from 'framer-motion';

export default function Location() {
  return (
    <motion.div
      className="section-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        Where Hearts Meet
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', textAlign: 'center', maxWidth: '600px', lineHeight: 1.6 }}>
        Join us at the historic Grand Hall, surrounded by elegant architecture and soft candlelight.
        <br /><br />
        <strong style={{ color: '#fff' }}>123 Midnight Avenue<br />The Starlight District</strong>
      </p>

      <div className="glass-card" style={{ width: '100%', maxWidth: '800px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Dark theme map iframe via CSS invert filter */}
        <div style={{ width: '100%', height: '400px', background: '#222', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps?q=29.946550287374635,31.188108573601998&z=16&output=embed"
          ></iframe>
        </div>

        <button className="btn-gold" style={{ marginTop: '2rem' }} onClick={() => window.open('https://maps.app.goo.gl/iUCDWB32aqwBLtRA7', '_blank')}>
          Open in Maps
        </button>
      </div>
    </motion.div>
  );
}

"use client";
import { useCountdown } from '../hooks/useCountdown';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Countdown() {
  const targetDate = new Date("2026-06-29T19:00:00");
  const timeLeft = useCountdown(targetDate);
  const { t } = useLanguage();

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <motion.div
      className="section-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
        {t('journeyBegins')}
      </h2>

      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="gold-glow-text" style={{ fontSize: '3rem', fontFamily: 'var(--font-playfair)' }}>
              {formatNumber(value)}
            </span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}>
              {t(unit.toLowerCase())}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

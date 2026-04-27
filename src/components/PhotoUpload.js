"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { uploadFile } from '../services/firebaseService';

export default function PhotoUpload() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]); // store names/icons only

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const res = await uploadFile(file);
      if (res.success) {
        setUploadedFiles(prev => [...prev, { name: res.name, url: res.url }]);
        setFile(null);
      }
    } catch (e) {
      console.error(e);
    }
    setIsUploading(false);
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
        Shared Memories
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', textAlign: 'center', maxWidth: '600px' }}>
        Share your photos of the event with us.
      </p>

      <div className="glass-card" style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="image/*"
        />
        <label
          htmlFor="file-upload"
          style={{
            display: 'block',
            width: '100%',
            padding: '2rem',
            border: '1px dashed rgba(212, 175, 55, 0.5)',
            borderRadius: '8px',
            textAlign: 'center',
            cursor: 'pointer',
            marginBottom: '1rem',
            color: 'var(--gold-accent)'
          }}
        >
          {file ? (<img style={{ width: '100%', height: '100%' }} src={URL.createObjectURL(file)} alt="" />) : "Click to select a file"}
        </label>

        <button
          onClick={handleUpload}
          className="btn-gold"
          disabled={!file || isUploading}
          style={{ width: '100%' }}
        >
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>

        {uploadedFiles.length > 0 && (
          <div style={{ marginTop: '2rem', width: '100%' }}>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Recent Uploads</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {uploadedFiles.map((f, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '1rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {/* File icon representation */}
                  <div style={{ width: '20px', height: '24px', background: 'var(--gold-glow)', borderRadius: '2px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '6px', height: '6px', background: '#fff', opacity: 0.5 }}></div>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {f.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

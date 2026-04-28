'use client';

import { useState } from 'react';
import styles from './Article.module.css';

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  );
}

export default function Share({ title }) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const isMobile = window.matchMedia('(max-width: 860px)').matches;
    if (isMobile && navigator.share) {
      navigator.share({ title, url }).catch(() => {});
      return;
    }
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" className={styles.shareBtn} onClick={handleClick} aria-live="polite">
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? 'Link copiado!' : 'Copiar link'}
    </button>
  );
}

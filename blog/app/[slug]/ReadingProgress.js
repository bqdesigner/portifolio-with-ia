'use client';

import { useEffect, useState } from 'react';
import styles from './Article.module.css';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const body = document.body;
      const scrolled = window.scrollY || doc.scrollTop || body.scrollTop || 0;
      const scrollHeight = Math.max(doc.scrollHeight, body.scrollHeight);
      const clientHeight = window.innerHeight || doc.clientHeight;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.body.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.body.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className={styles.readingProgress}>
      <div className={styles.readingProgressFill} style={{ width: `${progress}%` }} />
    </div>
  );
}

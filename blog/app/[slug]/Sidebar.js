'use client';

import { useEffect, useState } from 'react';
import styles from './Article.module.css';

export default function Sidebar({ toc, tags, title }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!toc.length) return;
    const headings = toc.map((t) => document.getElementById(t.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = headings.indexOf(entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [toc]);

  function jump(id, idx) {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActive(idx);
  }

  function copyLink() {
    if (typeof window === 'undefined') return;
    navigator.clipboard?.writeText(window.location.href);
  }

  function shareTwitter() {
    if (typeof window === 'undefined') return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
  }

  return (
    <aside className={styles.articleSidebar}>
      {toc.length > 0 && (
        <div className={styles.sidebarBlock}>
          <span className={styles.sidebarLabel}>— Neste artigo</span>
          <div className={styles.sidebarToc}>
            {toc.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.tocItem} ${active === i ? styles.tocItemActive : ''}`}
                onClick={() => jump(item.id, i)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div className={styles.sidebarBlock}>
          <span className={styles.sidebarLabel}>— Tags</span>
          <div className={styles.sidebarTags}>
            {tags.map((t) => (
              <a key={t} href={`/tag/${encodeURIComponent(t)}`} className={styles.sidebarTag}>{t}</a>
            ))}
          </div>
        </div>
      )}

      <div className={styles.sidebarBlock}>
        <span className={styles.sidebarLabel}>— Compartilhar</span>
        <div className={styles.sidebarShare}>
          <button type="button" className={styles.shareBtn} onClick={copyLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copiar link
          </button>
          <button type="button" className={styles.shareBtn} onClick={shareTwitter}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Twitter / X
          </button>
        </div>
      </div>
    </aside>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Article.module.css';

export default function Sidebar({ toc, tags }) {
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
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActive(idx);
  }

  function copyLink() {
    if (typeof window === 'undefined') return;
    navigator.clipboard?.writeText(window.location.href);
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
              <Link key={t} href={`/tag/${encodeURIComponent(t)}`} className={styles.sidebarTag}>{t}</Link>
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
        </div>
      </div>
    </aside>
  );
}

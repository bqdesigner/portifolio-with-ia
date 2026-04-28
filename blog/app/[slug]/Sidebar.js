'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Article.module.css';
import Share from './Share';

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
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActive(idx);
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
          <Share title={title} />
        </div>
      </div>
    </aside>
  );
}

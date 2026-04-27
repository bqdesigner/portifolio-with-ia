import { getPostsByTag, getPostBlocks } from '@/lib/notion';
import { getReadingTime } from '@/lib/utils';
import Link from 'next/link';
import styles from './Tag.module.css';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded} | Blog`,
    openGraph: { title: `#${decoded} | Blog` },
  };
}

export default async function TagPage({ params }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const rawPosts = await getPostsByTag(decoded);
  const posts = await Promise.all(
    rawPosts.map(async (p) => ({
      ...p,
      readingTime: getReadingTime(await getPostBlocks(p.id)),
    }))
  );

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>← Blog</Link>
        <h1 className={styles.title}>#{decoded}</h1>
        <p className={styles.adminSub}>{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
      </header>

      {posts.length === 0 ? (
        <p className={styles.empty}>Nenhum post com esta tag.</p>
      ) : (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/${post.slug}`} className={styles.card}>
                <div className={styles.cardMeta}>
                  {post.category && <span className={styles.category}>{post.category}</span>}
                  {post.publishedAt && (
                    <time className={styles.date}>
                      {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </time>
                  )}
                </div>
                <div className={styles.cardTitleRow}>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <span className={styles.readingTime}>{post.readingTime} min</span>
                </div>
                {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
              </Link>
              {post.tags.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.map((t) => (
                    <Link key={t} href={`/tag/${encodeURIComponent(t)}`} className={styles.tag}>
                      {t}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

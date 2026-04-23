import { getPosts } from '@/lib/notion';
import Link from 'next/link';
import styles from './blog.module.css';

export const revalidate = 60;

export const metadata = {
  title: 'Blog | Bruno Queirós',
  openGraph: { title: 'Blog | Bruno Queirós' },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <a href="/" className={styles.back}>← Bruno Queirós</a>
        <h1 className={styles.title}>Blog</h1>
      </header>

      {posts.length === 0 ? (
        <p className={styles.empty}>Nenhum post publicado ainda.</p>
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
                <h2 className={styles.cardTitle}>{post.title}</h2>
                {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
              </Link>
              {post.tags.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} className={styles.tag}>
                      {tag}
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

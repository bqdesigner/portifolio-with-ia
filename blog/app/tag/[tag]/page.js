import { getPostsByTag, getPostBlocks } from '@/lib/notion';
import { getReadingTime } from '@/lib/utils';
import Link from 'next/link';
import { PostCard } from '@/app/_components/BlogList';
import listStyles from '@/app/_components/BlogList.module.css';
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
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>← Blog</Link>
        <h1 className={styles.title}>#{decoded}</h1>
        <p className={styles.sub}>{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
      </header>

      {posts.length === 0 ? (
        <p className={styles.empty}>Nenhum post com esta tag.</p>
      ) : (
        <section className={listStyles.gridSection}>
          <div className={listStyles.grid}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

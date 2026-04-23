import { getPostBySlug, getPostBlocks, getPosts } from '@/lib/notion';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import NotionBlocks from '@/lib/NotionBlocks';
import styles from '../blog.module.css';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.ogImage ? [{ url: post.ogImage }] : [],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const blocks = await getPostBlocks(post.id);

  return (
    <main className={styles.main}>
      <nav className={styles.breadcrumb}>
        <a href="/">Bruno Queirós</a>
        <span>/</span>
        <Link href="/">Blog</Link>
      </nav>

      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <div className={styles.cardMeta}>
            {post.category && <span className={styles.category}>{post.category}</span>}
            {post.publishedAt && (
              <time className={styles.date}>
                {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                  day: '2-digit', month: 'long', year: 'numeric',
                })}
              </time>
            )}
          </div>
          <h1 className={styles.articleTitle}>{post.title}</h1>
          {post.excerpt && <p className={styles.articleExcerpt}>{post.excerpt}</p>}
          {post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} className={styles.tag}>
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div className={styles.articleBody}>
          <NotionBlocks blocks={blocks} />
        </div>
      </article>
    </main>
  );
}

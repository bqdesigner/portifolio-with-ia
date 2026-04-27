import { getAllPostsForAdmin } from '@/lib/notion';
import styles from './Admin.module.css';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Admin — Blog' };

export default async function AdminPage() {
  const posts = await getAllPostsForAdmin();

  const published = posts.filter((p) => p.status === 'published');
  const drafts = posts.filter((p) => p.status !== 'published');

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Admin</h1>
        <p className={styles.adminSub}>{published.length} publicados · {drafts.length} rascunhos</p>
      </header>

      <section>
        <h2 className={styles.adminSection}>Publicados</h2>
        <PostTable posts={published} />
      </section>

      {drafts.length > 0 && (
        <section>
          <h2 className={styles.adminSection}>Rascunhos</h2>
          <PostTable posts={drafts} />
        </section>
      )}

      <div className={styles.adminActions}>
        <a
          href={`https://notion.so/${process.env.NOTION_DATABASE_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.adminBtn}
        >
          Abrir database no Notion →
        </a>
        <form action="/blog/api/admin/logout" method="POST">
          <button type="submit" className={styles.adminBtnSecondary}>Sair</button>
        </form>
      </div>
    </main>
  );
}

function PostTable({ posts }) {
  if (!posts.length) return <p className={styles.empty}>Nenhum post aqui.</p>;
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Título</th>
          <th>Categoria</th>
          <th>Data</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.title || '(sem título)'}</td>
            <td>{post.category ?? '—'}</td>
            <td>
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('pt-BR')
                : '—'}
            </td>
            <td>
              <a href={post.notionUrl} target="_blank" rel="noopener noreferrer" className={styles.adminLink}>
                Editar no Notion
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

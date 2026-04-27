import styles from './NotionBlocks.module.css';
import { slugify } from '@/lib/utils';

export default function NotionBlocks({ blocks }) {
  return blocks.map((block) => <Block key={block.id} block={block} />);
}

function headingId(rich) {
  const text = rich?.map((r) => r.plain_text).join('') ?? '';
  return slugify(text);
}

function Block({ block }) {
  switch (block.type) {
    case 'paragraph':
      return <p>{richText(block.paragraph.rich_text)}</p>;
    case 'heading_1':
      return <h1 id={headingId(block.heading_1.rich_text)}>{richText(block.heading_1.rich_text)}</h1>;
    case 'heading_2':
      return <h2 id={headingId(block.heading_2.rich_text)}>{richText(block.heading_2.rich_text)}</h2>;
    case 'heading_3':
      return <h3 id={headingId(block.heading_3.rich_text)}>{richText(block.heading_3.rich_text)}</h3>;
    case 'bulleted_list_item':
      return <li>{richText(block.bulleted_list_item.rich_text)}</li>;
    case 'numbered_list_item':
      return <li>{richText(block.numbered_list_item.rich_text)}</li>;
    case 'quote':
      return <blockquote>{richText(block.quote.rich_text)}</blockquote>;
    case 'callout':
      return <div className={styles.callout}>{richText(block.callout.rich_text)}</div>;
    case 'code':
      return (
        <pre>
          <code>{richText(block.code.rich_text)}</code>
        </pre>
      );
    case 'divider':
      return <hr />;
    case 'image': {
      const src = block.image.type === 'external'
        ? block.image.external.url
        : block.image.file.url;
      const caption = block.image.caption?.[0]?.plain_text ?? '';
      return (
        <figure>
          <img src={src} alt={caption} loading="lazy" />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }
    default:
      return null;
  }
}

function richText(texts) {
  if (!texts?.length) return null;
  return texts.map((t, i) => {
    let node = t.plain_text;
    if (t.annotations.bold) node = <strong key={i}>{node}</strong>;
    if (t.annotations.italic) node = <em key={i}>{node}</em>;
    if (t.annotations.code) node = <code key={i}>{node}</code>;
    if (t.href) node = <a key={i} href={t.href} target="_blank" rel="noopener noreferrer">{node}</a>;
    return <span key={i}>{node}</span>;
  });
}

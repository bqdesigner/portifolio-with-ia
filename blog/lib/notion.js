import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID;

export async function getPosts({ includesDrafts = false } = {}) {
  const filter = includesDrafts
    ? undefined
    : {
        property: 'Status',
        select: { equals: 'published' },
      };

  const response = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter,
    sorts: [{ property: 'Published At', direction: 'descending' }],
  });

  return response.results.map(pageToPost);
}

export async function getPostBySlug(slug) {
  const response = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: {
      and: [
        { property: 'Slug', rich_text: { equals: slug } },
        { property: 'Status', select: { equals: 'published' } },
      ],
    },
  });

  if (!response.results.length) return null;
  return pageToPost(response.results[0]);
}

export async function getPostsByTag(tag) {
  const response = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: {
      and: [
        { property: 'Tags', multi_select: { contains: tag } },
        { property: 'Status', select: { equals: 'published' } },
      ],
    },
    sorts: [{ property: 'Published At', direction: 'descending' }],
  });

  return response.results.map(pageToPost);
}

export async function getPostBlocks(pageId) {
  const blocks = [];
  let cursor;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(...response.results);
    cursor = response.next_cursor;
  } while (cursor);

  return blocks;
}

export async function getAllPostsForAdmin() {
  return getPosts({ includesDrafts: true });
}

function pageToPost(page) {
  const props = page.properties;
  return {
    id: page.id,
    title: props.Title?.title?.[0]?.plain_text ?? '',
    slug: props.Slug?.rich_text?.[0]?.plain_text ?? '',
    excerpt: props.Excerpt?.rich_text?.[0]?.plain_text ?? '',
    category: props.Category?.select?.name ?? null,
    tags: props.Tags?.multi_select?.map((t) => t.name) ?? [],
    coverImage: props['Cover Image']?.url ?? null,
    ogImage: props['OG Image']?.url ?? null,
    status: props.Status?.select?.name ?? 'draft',
    publishedAt: props['Published At']?.date?.start ?? null,
    notionUrl: page.url,
  };
}

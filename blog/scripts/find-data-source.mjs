import { Client } from '@notionhq/client';
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => l.split('=').map((s) => s.trim()))
);

const notion = new Client({ auth: env.NOTION_TOKEN });
const db = await notion.databases.retrieve({ database_id: env.NOTION_DATABASE_ID });
console.log('Database title:', db.title?.[0]?.plain_text);
console.log('Data sources:', db.data_sources);

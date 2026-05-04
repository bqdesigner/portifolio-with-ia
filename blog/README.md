### Blog do portfolio

Sub-projeto Next.js que serve `/blog` em [brunoqueiros.com](https://brunoqueiros.com), com Notion como CMS. Deployado separado e plugado no site principal via rewrite no Vercel.

---

#### Stack

- **Next.js 16** (App Router) + **React 19**
- **Notion SDK v5** (`@notionhq/client`) puxando posts direto do Notion
- **CSS Modules** — sem framework de estilo, alinhado com o vanilla do site principal
- `basePath: '/blog'` no `next.config.mjs` pra rodar embaixo do domínio

#### Features

- Listagem de posts (`app/page.js`) buscando do Notion em build/runtime
- Página de post (`app/[slug]/page.js`) renderizando blocos do Notion via `NotionBlocks.js`
- Filtro por tag (`app/tag/[tag]`)
- Sidebar, share, back-to-top e barra de progresso de leitura
- Área `/admin` protegida por cookie `admin_token` (proxy em `proxy.js`)
- Tempo de leitura calculado a partir dos blocos
- Imagens remotas do S3 do Notion liberadas em `next.config.mjs`

#### Estrutura

```
app/
  page.js              → home do blog (lista)
  [slug]/              → post individual + componentes (Sidebar, Share, ReadingProgress…)
  tag/[tag]/           → listagem por tag
  admin/               → login + dashboard
  api/admin/           → endpoints autenticados
  _components/         → Header, BlogList compartilhados
lib/
  notion.js            → client + queries Notion
  utils.js             → helpers (slug, reading time, etc)
scripts/
  find-data-source.mjs → utilitário pra achar IDs no Notion
proxy.js               → middleware de auth do /admin
```

#### Dev

```bash
npm install
npm run dev   # http://localhost:3000/blog
```

Variáveis de ambiente necessárias em `.env.local`:

- `NOTION_TOKEN` — integration token do Notion
- `NOTION_DATABASE_ID` — database de posts
- `ADMIN_PASSWORD` — senha pro `/admin`

#### Workflow com IA

- **Vibecoding** com Claude Code, igual o site principal
- `AGENTS.md` avisa que **essa versão do Next.js tem breaking changes** — APIs e estrutura podem divergir do que o LLM aprendeu no treino. Sempre conferir docs em `node_modules/next/dist/docs/` antes de mexer.
- `CLAUDE.md` na raiz do blog com guidelines de comportamento (think before coding, simplicidade, mudanças cirúrgicas)

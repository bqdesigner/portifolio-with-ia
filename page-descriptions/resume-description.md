# Resume (CV) — Descritivo da Página

Origem: Figma `Site BQ - Old Versions`, node `635:688` (frame "CV").

## Metadados

| Campo | Valor |
|---|---|
| Layout | Página única, formato A4 (largura 595px), fundo branco |
| Padding vertical | 48px |
| Container | 595px de largura, coluna central |
| Fonte | Montserrat (Bold, SemiBold, Medium) |
| Cores | `#191819` (título), `#2E3131` (texto principal), `#767D7D` (texto secundário), `#CCC9C9` (labels de seção), `#121212` (corpo) |

---

## Estrutura de Seções

### 1. Header

- **Nome (H1):** Bruno Queirós — Montserrat Bold 20px, `#191819`
- **Cargo + Localização:** "Product Designer, São Paulo - Brasil" — Montserrat Medium 16px, `#2E3131`
- **Divisor:** linha horizontal full-width abaixo do bloco
- **Padding lateral:** 48px

---

### 2. Main (duas colunas)

Grid horizontal com gap de 22px, padding lateral 48px. Coluna esquerda (experiências) + divisor vertical + coluna direita (skills/tools/cursos).

#### 2.1 Coluna Esquerda — Latest Work Experiences

Label da seção: "LATEST WORK EXPERIENCES" — Montserrat Bold 12px uppercase, `#CCC9C9`.

Lista de cargos (gap 24px entre itens). Cada item tem:
- **Cargo** — Montserrat Bold 12px capitalize, `#2E3131`
- **Empresa • Período** — Montserrat Medium 8px uppercase. Empresa em `#2E3131`, separador (•) cinza, período em `#767D7D`
- **Descrição** — Montserrat Medium 9px, line-height 1.6, `#121212`, largura 332px
- **Link:** "Veja atuação completa no Linkedin →" (sublinhado)

##### Experiências listadas

| Cargo | Empresa | Período |
|---|---|---|
| Senior Product Designer | Stone | Out 2025 - Atualmente |
| Senior Product Designer | Frete.com | Mar 2022 - Out 2025 |
| Product Designer | Dasa | Set 2020 - Mar 2022 |
| Senior Product Designer | Agile Content | Out 2019 - Ago 2020 |
| Senior Product Designer | Fieldcorp | Mai 2019 - Out 2020 |

##### Descrições

**Stone (Senior Product Designer · Out 2025 - Atualmente)**
> Criando o futuro da renegociação na Stone. Estamos desenhando uma experiência que simplificará a vida do empreendedor, ajudando-o a superar desafios financeiros com agilidade e total transparência.

**Frete.com (Senior Product Designer · Mar 2022 - Out 2025)**
> Na Fretebras, atuei em produtos B2B (Transportadoras) e B2C (Motoristas), colaborando em diversas squads para criar soluções que impactam milhares de usuários e transacionam bilhões de reais.

**Dasa (Product Designer · Set 2020 - Mar 2022)**
> Na Dasa, atuei no Nav Pro, a área do Nav dedicada à criação de serviços para profissionais da saúde. Com mais de 20 mil médicos utilizando a plataforma, redesenhei a forma como os médicos leem e analisam resultados de exames, contribuindo para a predição de sintomas e acompanhamento da evolução de quadros clínicos. Também participei de outras jornadas, como Resumo Clínico, Telemedicina (Visão do Médico) e Monitor de Exames.

**Agile Content (Senior Product Designer · Out 2019 - Ago 2020)**
> Colaborei com a reestruturação dos processos de Design e implantação de novas ferramentas para melhorar a produtividade e entrega do time. Criação de workshops de ideação, levando o design para toda a empresa. Em conjunto com o time de RH e líderes de diversos times, reestruturamos o processo de onboarding na empresa. Utilizando de dinâmicas colaborativas, avançamos na construção de um novo site para a empresa, sem contar as outras iniciativas para promover e debater a diversidade.

**Fieldcorp (Senior Product Designer · Mai 2019 - Out 2020)**
> Fui responsável pela reformulação do principal sistema da empresa (Wiselog), cujo principal objetivo fosse a melhora da experiência do usuário e uma interface mais inovadora. Foi criado também um novo styleguide e o início de um Design System.

---

#### 2.2 Divisor Vertical

Linha vertical (rotação -90°) separando colunas.

---

#### 2.3 Coluna Direita (132px) — Skills · Tools · Courses

Cada subseção: label Montserrat Bold 12px uppercase `#CCC9C9` + lista Montserrat Medium 10px sublinhada capitalize `#121212`, gap 6px entre itens.

##### Skills

- UI & UX Design
- Product Design
- IA
- Product Management
- Product Strategy
- UX Metrics
- Visual Design
- UI Prototyping
- Wireframing
- Design System
- Acessibility

##### Tools

- Figma
- Claude Code
- Visual Studio Code
- Google Analytics
- Amplitude
- Webflow
- Framer

##### Recent Courses

Cada curso: nome (Montserrat SemiBold 10px `#121212`) + instituição/ano (Montserrat Medium 10px `#767D7D`).

| Curso | Instituição | Ano |
|---|---|---|
| Design de Futuros | ECHOS | 2023 |
| Product Management | PM3 | 2021 |
| Design System Specialist | Meiuca | 2021 |
| UX Research | Interaction Design Foundation | 2021 |

---

### 3. Footer

- **Divisor:** linha horizontal full-width (595px)
- **Linha de contatos** — Montserrat SemiBold 10px sublinhado, `#191819`, gap 35px:
  - +55 11 97019-6316
  - bqdesigner@outlook.com
  - in/itsbrunoqueiros
  - brunoqueiros.me

---

## Observações para implementação

- Layout pensado como CV imprimível (A4 ~595px) — ao portar para web, considerar versão responsiva ou manter como página fixa.
- Tamanhos muito pequenos (8px-10px) vêm do design impresso; revisar acessibilidade na versão web (mínimo 12-14px recomendado).
- Linkedin links: apontar para `linkedin.com/in/itsbrunoqueiros`.

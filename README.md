# Controle Portaria

Sistema de gestão de entrada e saída em portarias, multi-tenant (suporte a vários condomínios).

## Multi-tenant por Slug no Frontend

O frontend resolve o tenant a partir do subdomínio e consulta a API para obter o `condominiumId` pelo `slug`.

Fluxo recomendado:

1. Extrair o slug do subdomínio no frontend
2. Chamar `GET /api/condominiums/slug/:slug/id` para obter o id do condomínio.
3. Enviar `condominiumId` no body das rotas de autenticação.

Endpoints de autenticação:

- `POST /api/auth/register`: `condominiumId`, `name`, `email`, `password`, `role` (opcional)
- `POST /api/auth/login`: `condominiumId`, `email`, `password`

## Stack

- **Frontend (`web`)**: Next.js + TypeScript + Material UI + React Query + TanStack Table
- **Backend (`api`)**: Express + PostgreSQL
- **Licença**: MIT

## Pré-requisitos

- Node.js 20+
- pnpm 9+

## Instalação

```bash
pnpm install
```

## Estrutura do Monorepo

```text
.
├─ web/              # Aplicação frontend (Next.js)
├─ api/              # API backend (Express + PostgreSQL)
├─ package.json      # Scripts de atalho na raiz
└─ pnpm-workspace.yaml
```

## Desenvolvimento (Frontend)

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando             | Descrição                               |
| ------------------- | --------------------------------------- |
| `pnpm dev`          | Executa o frontend em `web`             |
| `pnpm build`        | Build de produção do frontend           |
| `pnpm start`        | Inicia o frontend em modo produção      |
| `pnpm lint`         | Lint do frontend (`web`)                |
| `pnpm format`       | Formata todos os pacotes do workspace   |
| `pnpm format:check` | Verifica formatação em todos os pacotes |

## Executar pacote específico

Frontend:

```bash
pnpm --filter ./web dev
```

API:

```bash
pnpm --filter ./api <script>
```

## Docker (API + Web + PostgreSQL)

O `docker compose` lê variáveis do arquivo `.env` na raiz do repositório. Comece criando esse arquivo a partir do exemplo:

```bash
cp .env.example .env
```

Suba todo o ambiente com um único comando:

```bash
docker compose up --build
```

Serviços disponíveis:

- Frontend: http://localhost:3000
- API: http://localhost:3333/api
- PostgreSQL: localhost:5432

Para rodar em background:

```bash
docker compose up --build -d
```

Para parar os serviços:

```bash
docker compose down
```

Para remover também o volume do banco:

```bash
docker compose down -v
```

Arquivos de exemplo disponíveis:

- `.env.example`: variáveis usadas pelo `docker compose`
- `api/.env.example`: variáveis para rodar a API localmente fora do Docker

> Observação: defina um valor forte para `JWT_SECRET` no seu `.env` antes de usar fora de desenvolvimento.

# Controle Portaria

Sistema de gestão de entrada e saída em portarias, multi-tenant (suporte a vários condomínios).

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

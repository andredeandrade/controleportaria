# Controle Portaria

Sistema de gestão de entrada e saída em portarias, multi-tenant (suporte a vários condomínios).

## Stack

- **Frontend**: Next.js + TypeScript + Material UI + React Query + TanStack Table
- **Backend**: Express + PostgreSQL (repositório separado)
- **Licença**: MIT

## Pré-requisitos

- Node.js 20+
- pnpm 9+

## Instalação

```bash
pnpm install
```

## Desenvolvimento

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando             | Descrição                                |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | Servidor de desenvolvimento              |
| `pnpm build`        | Build de produção                        |
| `pnpm start`        | Inicia build de produção                 |
| `pnpm lint`         | Verifica problemas de lint               |
| `pnpm format`       | Formata o código com Prettier            |
| `pnpm format:check` | Verifica formatação sem alterar arquivos |

## Estrutura do Projeto

```
src/
  pages/        # Rotas (Next.js Pages Router)
  styles/       # Estilos globais
```

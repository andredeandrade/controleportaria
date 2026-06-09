# API

Backend do Controle Portaria (Express + PostgreSQL).

## Fluxo de autenticação multi-tenant

O frontend deve enviar `condominiumId` no body das requisições de autenticação.

Fluxo:

1. Obter slug (a partir do subdomínio).
2. Consultar `GET /api/condominiums/slug/:slug/id`.
3. Usar o `id` retornado como `condominiumId` no login/cadastro.

## Endpoints relevantes

- `GET /api/condominiums/slug/:slug/id`
  - Retorno: `{ "id": "<condominium-id>" }`
- `POST /api/auth/register`
  - Body: `{ "condominiumId": "...", "name": "...", "email": "...", "password": "...", "role": "ADMIN|PORTARIA" }`
- `POST /api/auth/login`
  - Body: `{ "condominiumId": "...", "email": "...", "password": "..." }`

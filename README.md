# 🎮 Locadora S/A — Sistema de Aluguel de Jogos

Projeto final desenvolvido para a disciplina de Desenvolvimento de Software.
Sistema web completo para gerenciamento de uma locadora de jogos retrô, com cadastro de jogos, usuários e controle de aluguéis.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19 + Vite 7 |
| Estilização | Tailwind CSS v4 (utilitários direto no JSX, sem classes customizadas) |
| Backend | Node.js + Express |
| Banco de dados | PostgreSQL via **Neon** (serverless) |
| Testes E2E | Playwright |
| Testes de API | Jest + Supertest |

> **Por que Neon?**
> O banco de dados é hospedado no [Neon](https://neon.tech), plataforma serverless de PostgreSQL. Isso elimina a necessidade de instalar e configurar o PostgreSQL localmente (sem pgAdmin, sem serviço rodando na máquina), permitindo que qualquer avaliador rode o projeto com um simples `npm install` + variáveis de ambiente configuradas.

---

## Requisitos Funcionais Implementados

| RF | Descrição | Status |
|----|-----------|--------|
| RF01 | Login de usuário | ✅ |
| RF02 | Logout | ✅ |
| RF03 | Dashboard com estatísticas | ✅ |
| RF04 | Listar jogos | ✅ |
| RF05 | Cadastrar jogo | ✅ |
| RF06 | Editar jogo | ✅ |
| RF07 | Excluir jogo | ✅ |
| RF08 | Listar usuários | ✅ |
| RF09 | Cadastrar usuário | ✅ |
| RF10 | Listar aluguéis | ✅ |
| RF11 | Editar usuário | ✅ |
| RF12 | Excluir usuário | ✅ |
| RF13 | Buscar jogo | ✅ |
| RF14 | Histórico de aluguéis | ✅ |

---

## Estrutura do Repositório

```
locadora_SA/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                   # Conexão com Neon (PostgreSQL serverless)
│   │   ├── controller/
│   │   │   ├── games.controller.js
│   │   │   └── rental.controller.js
│   │   ├── database/
│   │   │   ├── schema.sql              # Estrutura das tabelas
│   │   │   └── seed.sql                # Dados iniciais para desenvolvimento
│   │   ├── routes/
│   │   │   ├── customers.routes.js
│   │   │   ├── games.routes.js
│   │   │   └── rentals.routes.js
│   │   ├── services/
│   │   │   ├── customers.service.js
│   │   │   ├── games.service.js
│   │   │   └── rental.service.js
│   │   └── tests/
│   │       └── locadora.spec.js
│   ├── docker-compose.yml
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Modal.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Table.jsx
│   │   ├── pages/
│   │   │   ├── Alugueis.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Jogos.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Usuarios.jsx
│   │   ├── services/
│   │   │   └── api.js                  # Client HTTP centralizado
│   │   ├── tests/
│   │   │   └── jogos.spec.js
│   │   ├── App.jsx
│   │   ├── index.css                   # Tema neon via @theme do Tailwind v4
│   │   └── main.jsx
│   ├── test-results/
│   │   └── .last-run.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── playwright.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- npm 9+

> Não é necessário instalar PostgreSQL — o banco já está na nuvem via Neon.

### 1. Clonar o repositório

```bash
git clone https://github.com/francagiovanna/repUnico_LocadoraSA.git
cd repUnico_LocadoraSA/locadora_SA
```

### 2. Configurar o Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` dentro de `backend/`:

```env
DATABASE_URL=postgresql://usuario:senha@host.neon.tech/locadora_sa?sslmode=require
PORT=3001
```

> A `DATABASE_URL` é fornecida diretamente pelo painel do Neon após criar o banco.

Inicializar as tabelas (apenas na primeira vez):

```bash
# Execute o schema e o seed no painel SQL do Neon, ou via psql:
psql $DATABASE_URL -f src/database/schema.sql
psql $DATABASE_URL -f src/database/seed.sql
```

Iniciar o servidor:

```bash
npm run dev
# Servidor rodando em http://localhost:3001
```

### 3. Configurar o Frontend

```bash
cd ../frontend
npm install
npm run dev
# Aplicação rodando em http://localhost:5173
```

### 4. Acesso

Abra `http://localhost:5173` no navegador.

Credenciais de acesso:
- **E-mail:** `admin@locadora.sa`
- **Senha:** `12345`

---

## Testes

### Testes de API (Jest + Supertest)

```bash
cd backend
npm test
```

### Testes E2E (Playwright)

```bash
cd frontend

# Rodar todos os testes
npm test

# Rodar com interface visual
npm run test:ui

# Ver relatório HTML dos resultados
npm run test:report
```

> Os testes cobrem os casos CT01 a CT16 descritos no Descritivo de Casos de Teste (v2.0).

---

## Endpoints da API

### Usuários (Customers)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/customers` | Listar todos |
| GET | `/customers/:id` | Buscar por ID |
| POST | `/customers` | Criar usuário |
| PUT | `/customers/:id` | Editar usuário (RF11) |
| DELETE | `/customers/:id` | Excluir usuário (RF12) |

### Jogos (Games)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/games` | Listar todos |
| GET | `/games?busca=termo` | Buscar por título (RF13) |
| GET | `/games/:id` | Buscar por ID |
| POST | `/games` | Cadastrar jogo |
| PUT | `/games/:id` | Editar jogo |
| DELETE | `/games/:id` | Excluir jogo |

### Aluguéis (Rentals)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/rentals` | Listar todos |
| GET | `/rentals/historico/:clienteId` | Histórico por cliente (RF14) |
| POST | `/rentals` | Registrar aluguel |
| PUT | `/rentals/:id/devolver` | Registrar devolução |

---

## Identidade Visual

Interface com tema **cyberpunk/neon retro**, inspirada em telas de arcade dos anos 80/90. Paleta de cores e fontes registradas como tokens do Tailwind v4 via `@theme` em `index.css`:

- **Cor primária:** `#00ffe7` (neon ciano)
- **Acento:** `#ff00aa` (neon rosa)
- **Alerta:** `#ff3366` (vermelho neon)
- **Fontes:** Orbitron (display), Share Tech Mono (corpo), VT323 (decorativo)

---

## Documentação

| Documento | Descrição |
|-----------|-----------|
| Requisitos Funcionais v2.0 | RF01 a RF14 |
| Descritivo de Casos de Teste v2.0 | CT01 a CT16 |
| Relatório de Execução e Validação | Seção 8.5 — evidências de teste |
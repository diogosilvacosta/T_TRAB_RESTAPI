# Atividade Prática #1 — Consumo e Implementação de APIs RESTful

Aplicação web para gerir **alunos** e **cursos**, com frontend e backend separados:

- API simulada com **JSON-server** (testada com **Postman**)
- Interface web em HTML/CSS/JS com **Fetch API** e `async/await`
- API real com **Node.js + Express + MongoDB Atlas** (Mongoose, arquitetura **MVC**)
- Documentação com **Swagger** em `/api-docs`
- Deploy no **Render** (API) e **Render/Vercel** (frontend)

## 🔗 Links de deploy

| | URL |
|---|---|
| **Front-end** | _a preencher após o deploy_ |
| **API REST** | _a preencher após o deploy_ (ex.: `https://sir-restapi-at1.onrender.com/api`) |
| **Swagger** | _URL da API_ + `/api-docs` |

> No plano gratuito do Render a API "adormece" sem uso: o primeiro pedido pode demorar ~50 s.

## 📁 Estrutura do projeto

```
T_TRAB_RESTAPI/
├── frontend/          ← Interface web (HTML/CSS/JS)
│   ├── index.html
│   ├── config.js      ← escolhe a API (json-server, backend local ou Render)
│   ├── script.js      ← CRUD com Fetch API
│   └── style.css
├── backend/           ← API RESTful (Express + MongoDB Atlas, MVC)
│   ├── config/db.js         ← ligação ao MongoDB
│   ├── models/              ← Aluno, Curso (Mongoose)
│   ├── controllers/         ← lógica de cada endpoint
│   ├── routes/              ← rotas Express + anotações Swagger
│   ├── middleware/          ← validação de ids
│   ├── docs/swagger.js      ← configuração do Swagger (/api-docs)
│   ├── seed.js              ← migra mock-data/bd.json para o Atlas
│   ├── server.js
│   └── package.json         ← usado no deploy do Render
├── mock-server/       ← configuração do JSON-server
├── mock-data/bd.json  ← base de dados JSON original
├── tests/             ← coleção de testes Postman
├── render.yaml        ← blueprint de deploy no Render
└── package.json       ← scripts para correr tudo a partir da raiz
```

## ▶️ Como executar localmente

Requisitos: Node.js 18+.

```bash
npm install
```

### 1. API simulada (JSON-server) + frontend

```bash
npm run mock-server
```

- API: `http://localhost:3000/alunos` e `http://localhost:3000/cursos`
- Frontend (servido como recurso estático pelo JSON-server com `--static`): `http://localhost:3000`

### 2. API real (Express + MongoDB Atlas)

1. Criar um cluster gratuito no [MongoDB Atlas](https://www.mongodb.com/atlas), um utilizador da BD
   e permitir o acesso de rede (`0.0.0.0/0` para o Render conseguir ligar).
2. Copiar `backend/.env.example` para `backend/.env` e colocar a connection string em `MONGO_URI`.
3. Migrar os dados do `bd.json` para o Atlas (apaga e recria as coleções):

   ```bash
   npm run seed
   ```

4. Iniciar a API:

   ```bash
   npm run backend      # ou: npm run dev (com nodemon)
   ```

- API: `http://localhost:5000/api/alunos` e `http://localhost:5000/api/cursos`
- Swagger: `http://localhost:5000/api-docs`
- Frontend ligado à API real: `http://localhost:5000`

### Que API usa o frontend?

Definido em `frontend/config.js`:

| Onde abre o frontend | API usada |
|---|---|
| `http://localhost:3000` (JSON-server) | API simulada |
| `http://localhost:5000` (Express) | API real local |
| Vercel / Render | API real no Render (`API_PRODUCAO`) |
| Qualquer um com `?api=URL` | o URL indicado |

## 📡 Endpoints

| Método | JSON-server | API real | Descrição |
|---|---|---|---|
| GET | `/alunos` | `/api/alunos` | Listar alunos (`?idCurso=` para filtrar) |
| GET | `/alunos/:id` | `/api/alunos/:id` | Obter um aluno |
| POST | `/alunos` | `/api/alunos` | Criar aluno |
| PUT | `/alunos/:id` | `/api/alunos/:id` | Substituir aluno |
| PATCH | `/alunos/:id` | `/api/alunos/:id` | Atualizar parcialmente |
| DELETE | `/alunos/:id` | `/api/alunos/:id` | Apagar aluno |
| GET | `/cursos` | `/api/cursos` | Listar cursos |
| GET | `/cursos/:id` | `/api/cursos/:id` | Obter um curso |
| POST | `/cursos` | `/api/cursos` | Criar curso |
| PUT / PATCH | `/cursos/:id` | `/api/cursos/:id` | Atualizar curso |
| DELETE | `/cursos/:id` | `/api/cursos/:id` | Apagar curso (a API real recusa com 409 se tiver alunos) |

Formato de um aluno:

```json
{ "id": 1, "nome": "Joana", "apelido": "Silva", "idCurso": 1, "anoCurricular": 2, "idade": 21 }
```

Na API real os `id` e `idCurso` são ObjectIds do MongoDB (strings), mas o formato é o mesmo
(o Mongoose devolve `id` em vez de `_id`), por isso o frontend funciona com as duas APIs.

## 🧪 Testes (Postman)

Importar `tests/postman-collection.json` no Postman e usar **Run collection**.
A variável `baseUrl` da coleção escolhe a API:

- `http://localhost:3000` → JSON-server (valor por omissão)
- `http://localhost:5000/api` → API real local
- `https://<servico>.onrender.com/api` → API em produção

Também pode ser corrida na linha de comandos:

```bash
npx newman run tests/postman-collection.json
npx newman run tests/postman-collection.json --env-var baseUrl=http://localhost:5000/api
```

## 🚀 Deploy

### Opção A — Blueprint do Render (API + frontend)

1. No [Render](https://render.com): **New → Blueprint** e escolher este repositório (usa o `render.yaml`).
2. No serviço `sir-restapi-at1`, em **Environment**, definir `MONGO_URI` com a connection string do Atlas.
3. Se o URL da API for diferente de `https://sir-restapi-at1.onrender.com`, atualizar `API_PRODUCAO` em `frontend/config.js` e fazer push.
4. Colocar os dois URLs na secção **Links de deploy** acima.

### Opção B — Manual

**API no Render** (New → Web Service):

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Variável de ambiente: `MONGO_URI`

**Frontend no Vercel** (Add New → Project):

- Root Directory: `frontend`
- Framework Preset: Other (sem build)

## 🛠️ Tecnologias

Node.js · Express · MongoDB Atlas · Mongoose · JSON-server · Fetch API · Swagger (swagger-jsdoc + swagger-ui-express) · Postman/Newman

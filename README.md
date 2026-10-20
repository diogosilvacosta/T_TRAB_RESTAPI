# Atividade Prática #1 - Consumo e Implementação de APIs RESTful

## Links de Deploy

- **Front-end:** https://sir-trab1-frontend.vercel.app
- **API REST:** https://sir-restapi-at1.onrender.com/api
- **Swagger:** https://sir-restapi-at1.onrender.com/api-docs

## Estrutura do Projeto

```
T_TRAB_RESTAPI/
├── frontend/       ← Interface web (HTML/CSS/JS com Fetch API)
├── backend/        ← API RESTful (Express + MongoDB Atlas + Mongoose MVC)
│   ├── config/     ← Ligação à BD
│   ├── models/     ← Modelos Mongoose (Aluno, Curso)
│   ├── controllers/← Lógica de cada endpoint
│   ├── routes/     ← Rotas Express (com comentários Swagger)
│   └── docs/       ← Configuração do Swagger
├── mock-server/    ← JSON-server
├── mock-data/      ← Base de dados JSON (bd.json)
├── tests/          ← Coleção Postman
└── README.md
```

## Como Executar

```bash
npm install
```

### API simulada (JSON-server)

```bash
npm run mock-server
```

- API: `http://localhost:3000/alunos` e `http://localhost:3000/cursos`
- Frontend: `http://localhost:3000` (servido pelo JSON-server com `--static`)

### API real (Express + MongoDB Atlas)

1. Criar `backend/.env` com a variável `MONGO_URI` (ver `backend/.env.example`)
2. Passar os dados do `bd.json` para o Atlas: `npm run seed`
3. Iniciar: `npm run backend`

- API: `http://localhost:5000/api/alunos` e `http://localhost:5000/api/cursos`
- Swagger: `http://localhost:5000/api-docs`

## Endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /alunos | Listar alunos |
| GET | /alunos/:id | Obter um aluno |
| POST | /alunos | Criar aluno |
| PUT | /alunos/:id | Atualizar aluno |
| PATCH | /alunos/:id | Atualizar parcialmente |
| DELETE | /alunos/:id | Apagar aluno |
| GET | /cursos | Listar cursos |
| GET | /cursos/:id | Obter um curso |

Na API real os endpoints têm o prefixo `/api` (ex.: `/api/alunos`).

## Testes (Postman)

Importar `tests/postman-collection.json` no Postman.
Por omissão testa o JSON-server (`baseUrl = http://localhost:3000`).
Para testar a API real, mudar `baseUrl` para `http://localhost:5000/api`.

## Deploy

### Backend no Render

1. Novo **Web Service** no [Render](https://render.com) ligado ao repositório
2. **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Variável de ambiente `MONGO_URI` com a ligação ao Atlas

### Front-end no Vercel

1. Importar o repositório no [Vercel](https://vercel.com)
2. **Root Directory:** `frontend`
3. No `frontend/script.js`, confirmar que o URL da API do Render está correto

## Tecnologias

- Node.js + Express
- MongoDB Atlas + Mongoose
- JSON-Server
- Fetch API
- Swagger (swagger-jsdoc + swagger-ui-express)

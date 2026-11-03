# Atividade Prática #1 - Consumo e Implementação de APIs RESTful

Frontend de gestão de alunos em **Svelte 5 + Tailwind CSS 4**, com Vite. A API Express/MongoDB mantém o contrato original.

- [Tutorial e explicação do código](docs/TUTORIAL_SVELTE_TAILWIND.md)
- [Etapas, branches, commits e validações](docs/EVOLUCAO_SVELTE.md)
- [Índice da documentação](docs/README.md)

A migração está na branch `feature/svelte-tailwind`. Os links de produção abaixo acompanham a branch configurada no alojamento.

## Links de Deploy

- **Front-end:** https://sir-trab1-frontend.vercel.app
- **API REST:** https://sir-restapi-at1.onrender.com/api
- **Swagger:** https://sir-restapi-at1.onrender.com/api-docs

## Estrutura do Projeto

```
T_TRAB_RESTAPI/
├── frontend/       ← Svelte + Tailwind CSS + Vite
├── backend/        ← API RESTful (Express + MongoDB Atlas + Mongoose MVC)
│   ├── config/     ← Ligação à BD
│   ├── models/     ← Modelos Mongoose (Aluno, Curso)
│   ├── controllers/← Lógica de cada endpoint
│   ├── routes/     ← Rotas Express (com comentários Swagger)
│   └── docs/       ← Configuração do Swagger
├── mock-server/    ← JSON-server
├── mock-data/      ← Base de dados JSON (bd.json)
├── tests/          ← Coleção Postman
├── docs/           ← Tutorial e evolução da migração
└── README.md
```

## Como Executar

Recomenda-se Node.js **24 LTS**, utilizado na validação; a série 22 é suportada a partir de **22.12**. Instalar as dependências na raiz e no frontend:

```bash
npm ci
npm --prefix frontend ci
```

### API simulada (JSON-server)

```bash
npm run mock-server
```

- API: `http://localhost:3000/alunos` e `http://localhost:3000/cursos`

Noutro terminal, iniciar a interface:

```bash
npm run dev
```

- Frontend: `http://127.0.0.1:5173`
- O JSON-server disponibiliza os dados; o Vite serve e compila os componentes Svelte.
- As operações feitas na API simulada alteram `mock-data/bd.json`.

### API real (Express + MongoDB Atlas)

1. Criar `backend/.env` com a variável `MONGO_URI` (ver `backend/.env.example`)
2. Iniciar: `npm run backend`

Para preparar uma base de dados de teste com os dados de exemplo, existe o comando opcional `npm run seed`. Esse comando apaga os alunos e os cursos da base indicada por `MONGO_URI` e volta a inseri-los a partir de `mock-data/bd.json`. Não é necessário executá-lo para usar uma base que já tem dados.

- API: `http://localhost:5000/api/alunos` e `http://localhost:5000/api/cursos`
- Swagger: `http://localhost:5000/api-docs`

Para ligar o frontend à API Express local, criar `frontend/.env.local` com:

```dotenv
VITE_API_URL=http://localhost:5000/api
```

Reiniciar o Vite depois de alterar esse ficheiro. Sem configuração, o modo de desenvolvimento usa `http://localhost:3000`; o build de produção usa a API do Render.

`VITE_API_URL` é um endereço público incluído no frontend. A ligação MongoDB continua apenas no `.env` do backend.

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

## Verificações e testes

Verificação do frontend, testes do cliente HTTP e compilação:

```bash
npm run check
npm test
npm run build
```

O build fica em `frontend/dist`. `npm run preview` permite abrir esse build; usa o endereço de API configurado no momento da compilação. Os testes automáticos usam respostas simuladas e não alteram a base de dados de produção.

### Coleção Postman

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
3. **Framework:** Vite; **Build Command:** `npm run build`; **Output Directory:** `dist`
4. Se necessário, definir `VITE_API_URL=https://sir-restapi-at1.onrender.com/api`

Estas definições também estão em `frontend/vercel.json`. O frontend não precisa de credenciais MongoDB.

## Tecnologias

- Node.js + Express
- MongoDB Atlas + Mongoose
- JSON-Server
- Fetch API
- Svelte 5 e Vite
- Tailwind CSS 4
- Swagger (swagger-jsdoc + swagger-ui-express)

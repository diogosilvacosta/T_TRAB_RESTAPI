# Atividade Prática #1 - Consumo e Implementação de APIs RESTful

## Links de Deploy

- **Front-end:** [URL do Vercel/Render](https://seu-frontend.vercel.app)
- **API REST:** [URL do Render](https://sir-restapi-at1.onrender.com)
- **Documentação Swagger:** [URL da API]/api-docs)

## Estrutura do Projeto

```
T_TRAB_RESTAPI/
├── frontend/       ← Interface web (HTML/CSS/JS com Fetch API)
├── backend/        ← API RESTful (Node.js + Express + MongoDB Atlas + Mongoose MVC)
│   ├── config/     ← Configuração da ligação à BD
│   ├── models/     ← Modelos Mongoose (Aluno, Curso)
│   ├── controllers/← Lógica de negócio
│   ├── routes/     ← Rotas Express
│   └── docs/       ← Documentação Swagger
├── mock-server/    ← JSON-server configurado
├── mock-data/      ← Base de dados JSON original
├── tests/          ← Coleção de testes Postman
└── README.md
```

## Como Executar

### 1. Instalar dependências

```bash
npm install
```

### 2. API Simulada (JSON-server)

```bash
npm run mock-server
```

A API simulada fica em `http://localhost:3000` e o frontend é servido em `http://localhost:3000`.

### 3. API Real (Express + MongoDB Atlas)

```bash
# Criar ficheiro backend/.env com a variável MONGO_URI (ver backend/.env.example)
npm run backend
```

A API real fica em `http://localhost:5000`.

### 4. Documentação Swagger

Aceder a `http://localhost:5000/api-docs`.

## Testes (Postman)

Importar a coleção em `tests/postman-collection.json` no Postman e testar contra `http://localhost:3000` (mock) ou `http://localhost:5000/api` (real).

## Deploy

### Backend no Render

1. Criar um novo **Web Service** no [Render](https://render.com)
2. Ligar ao repositório GitHub
3. Configurações:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. Adicionar variável de ambiente `MONGO_URI` com a ligação ao Atlas

### Front-end no Vercel

1. Importar o repositório no [Vercel](https://vercel.com)
2. **Root Directory:** `frontend`
3. Deploy automático

## Tecnologias

- Node.js + Express
- MongoDB Atlas + Mongoose
- JSON-Server
- Fetch API
- Swagger (swagger-ui-express)

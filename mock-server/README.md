# mock-server

API simulada com JSON-server, a partir de `mock-data/bd.json`.
O JSON-server também serve o frontend como ficheiros estáticos (`--static`).

## Como executar

```bash
# Na raiz do projeto
npm install
npm run mock-server

# ou dentro desta pasta
npm install
npm start
```

A API fica em `http://localhost:3000` e o frontend em `http://localhost:3000`.

## Endpoints

| Método | Endpoint          | Descrição          |
|--------|-------------------|--------------------|
| GET    | /alunos           | Listar alunos      |
| GET    | /alunos/:id       | Obter um aluno     |
| POST   | /alunos           | Criar aluno        |
| PUT    | /alunos/:id       | Atualizar aluno    |
| PATCH  | /alunos/:id       | Atualizar parcial  |
| DELETE | /alunos/:id       | Apagar aluno       |
| GET    | /cursos           | Listar cursos      |
| GET    | /cursos/:id       | Obter um curso     |

# mock-server

API simulada com JSON-server.

## Como executar

```bash
# Na raiz do projeto
npm install
npm run mock-server
```

A API estará disponível em `http://localhost:3000` e o frontend em `http://localhost:3000` (servido estaticamente).

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

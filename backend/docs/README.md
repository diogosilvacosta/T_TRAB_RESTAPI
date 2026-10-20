# Documentação da API (Swagger)

A documentação é gerada a partir dos comentários `@swagger` nos ficheiros `backend/routes/`.

- Swagger UI: `/api-docs` (ex.: `http://localhost:5000/api-docs`)

## Endpoints

| Método | Endpoint           | Descrição         |
|--------|--------------------|-------------------|
| GET    | /api/alunos        | Listar alunos     |
| GET    | /api/alunos/:id    | Obter um aluno    |
| POST   | /api/alunos        | Criar aluno       |
| PUT    | /api/alunos/:id    | Atualizar aluno   |
| PATCH  | /api/alunos/:id    | Atualizar parcial |
| DELETE | /api/alunos/:id    | Apagar aluno      |
| GET    | /api/cursos        | Listar cursos     |
| GET    | /api/cursos/:id    | Obter um curso    |

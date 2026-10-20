# Documentação da API (Swagger)

A documentação é gerada com **swagger-jsdoc** a partir dos comentários `@swagger`
em `backend/routes/*.js` e servida com **swagger-ui-express**.

- Swagger UI: `/api-docs` (ex.: `http://localhost:5000/api-docs`)
- Especificação OpenAPI em JSON: `/api-docs.json`

## Endpoints documentados

### Alunos

| Método | Endpoint         | Descrição                         |
|--------|------------------|-----------------------------------|
| GET    | /api/alunos      | Listar alunos (`?idCurso=`)       |
| POST   | /api/alunos      | Criar aluno                       |
| GET    | /api/alunos/{id} | Obter um aluno                    |
| PUT    | /api/alunos/{id} | Substituir aluno                  |
| PATCH  | /api/alunos/{id} | Atualizar parcialmente            |
| DELETE | /api/alunos/{id} | Apagar aluno                      |

### Cursos

| Método | Endpoint         | Descrição                         |
|--------|------------------|-----------------------------------|
| GET    | /api/cursos      | Listar cursos                     |
| POST   | /api/cursos      | Criar curso                       |
| GET    | /api/cursos/{id} | Obter um curso                    |
| PUT    | /api/cursos/{id} | Atualizar curso                   |
| PATCH  | /api/cursos/{id} | Atualizar curso                   |
| DELETE | /api/cursos/{id} | Apagar curso (409 se tiver alunos)|

## Códigos de resposta

- `200` sucesso · `201` criado
- `400` dados inválidos, JSON inválido ou id com formato errado
- `404` recurso não encontrado
- `409` conflito (curso com alunos inscritos)
- `500` erro interno

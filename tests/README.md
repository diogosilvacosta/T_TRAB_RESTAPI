# Testes

Coleção de testes Postman para a API de gestão de alunos.

## Como usar

1. Abrir o Postman e importar `postman-collection.json`
2. Iniciar o json-server: `npm run mock-server` (na raiz do projeto)
3. Correr os pedidos pela ordem (o "Criar aluno" guarda o id do aluno na variável `alunoId`)
4. Para testar a API real, mudar a variável `baseUrl` para `http://localhost:5000/api`

## Endpoints testados

### Alunos
- GET /alunos - Listar todos
- POST /alunos - Criar
- GET /alunos/:id - Obter por ID
- PUT /alunos/:id - Atualizar
- PATCH /alunos/:id - Atualizar parcial
- DELETE /alunos/:id - Apagar

### Cursos
- GET /cursos - Listar todos
- GET /cursos/:id - Obter por ID

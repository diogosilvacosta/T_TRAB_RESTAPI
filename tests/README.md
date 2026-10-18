# Testes

Coleção de testes Postman para a API de gestão de alunos.

## Como usar

1. Abrir o Postman
2. Importar o ficheiro `postman-collection.json`
3. Iniciar o json-server: `npm run mock-server` (na raiz do projeto)
4. Executar os pedidos contra `http://localhost:3000`

## Endpoints testados

### Alunos
- GET /alunos - Listar todos
- GET /alunos/:id - Obter por ID
- POST /alunos - Criar
- PUT /alunos/:id - Atualizar
- PATCH /alunos/:id - Atualizar parcial
- DELETE /alunos/:id - Apagar

### Cursos
- GET /cursos - Listar todos
- GET /cursos/:id - Obter por ID

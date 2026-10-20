# mock-server

API simulada com **JSON-server 0.17**, a partir de `../mock-data/bd.json`.
O JSON-server também serve o frontend (`../frontend`) como recursos estáticos (opção `--static`).

## Configuração

- `json-server.json` — porta 3000, `watch` e pasta estática (usado pelo script da raiz)
- `package.json` — script para correr a partir desta pasta

## Como executar

```bash
# A partir da raiz do projeto
npm install
npm run mock-server

# ou a partir desta pasta
cd mock-server
npm install
npm start
```

- API: `http://localhost:3000/alunos`, `http://localhost:3000/cursos`
- Frontend: `http://localhost:3000`

## Endpoints

| Método | Endpoint      | Descrição          |
|--------|---------------|--------------------|
| GET    | /alunos       | Listar alunos      |
| GET    | /alunos/:id   | Obter um aluno     |
| POST   | /alunos       | Criar aluno        |
| PUT    | /alunos/:id   | Substituir aluno   |
| PATCH  | /alunos/:id   | Atualizar parcial  |
| DELETE | /alunos/:id   | Apagar aluno       |
| GET    | /cursos       | Listar cursos      |
| GET    | /cursos/:id   | Obter um curso     |
| POST   | /cursos       | Criar curso        |
| PUT    | /cursos/:id   | Atualizar curso    |
| DELETE | /cursos/:id   | Apagar curso       |

Filtros do JSON-server também funcionam, ex.: `GET /alunos?idCurso=1`.

> Com `--watch`, as alterações feitas pela API ficam gravadas no `bd.json`.

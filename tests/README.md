# Testes (Postman)

Coleção `postman-collection.json` com 12 pedidos e 21 asserções para alunos e cursos.

## Como usar

1. Abrir o Postman e importar `postman-collection.json`.
2. Iniciar a API a testar:
   - JSON-server: `npm run mock-server` (na raiz do projeto)
   - API real: `npm run backend`
3. Nas **Variables** da coleção, ajustar `baseUrl`:
   - `http://localhost:3000` → JSON-server (por omissão)
   - `http://localhost:5000/api` → API real local
   - `https://<servico>.onrender.com/api` → API em produção
4. **Run collection** (correr pela ordem):
   - `Listar cursos` guarda o id do primeiro curso (`cursoId`)
   - `Criar curso` / `Criar aluno` guardam os ids criados para os pedidos seguintes
   - No fim o aluno e o curso de teste são apagados, por isso a coleção pode correr várias vezes

## Linha de comandos (Newman)

```bash
npx newman run tests/postman-collection.json
npx newman run tests/postman-collection.json --env-var baseUrl=http://localhost:5000/api
```

## Pedidos

### Cursos
- GET /cursos — listar (guarda `cursoId`)
- GET /cursos/:id — obter por id
- POST /cursos — criar
- PUT /cursos/:id — atualizar
- DELETE /cursos/:id — apagar

### Alunos
- GET /alunos — listar
- POST /alunos — criar (guarda `alunoId`)
- GET /alunos/:id — obter por id
- PUT /alunos/:id — substituir
- PATCH /alunos/:id — atualizar parcialmente
- DELETE /alunos/:id — apagar
- GET /alunos/:id — confirmar que devolve 404 depois de apagado

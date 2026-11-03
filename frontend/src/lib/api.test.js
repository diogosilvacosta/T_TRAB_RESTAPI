import test from 'node:test';
import assert from 'node:assert/strict';
import { criarApi, idDe } from './api.js';

test('aceita IDs do JSON-server e do MongoDB, incluindo o ID numérico zero', () => {
  assert.equal(idDe({ id: 0 }), 0);
  assert.equal(idDe({ id: 2, _id: 'mongo-id' }), 'mongo-id');
});

test('envia os dados como JSON e normaliza a barra final da API', async () => {
  const dados = { nome: 'Ana', apelido: 'Costa', idCurso: 1, anoCurricular: 2, idade: null };
  const api = criarApi('http://teste/api/', async (url, options) => {
    assert.equal(url, 'http://teste/api/alunos');
    assert.equal(options.method, 'POST');
    assert.equal(options.headers['Content-Type'], 'application/json');
    assert.deepEqual(JSON.parse(options.body), dados);
    return Response.json({ ...dados, _id: 'abc' }, { status: 201 });
  });
  assert.equal((await api.adicionarAluno(dados))._id, 'abc');
});

test('uma idade limpa é transmitida como null no PUT', async () => {
  const api = criarApi('http://teste', async (url, options) => {
    assert.equal(url, 'http://teste/alunos/42');
    assert.equal(options.method, 'PUT');
    assert.equal(JSON.parse(options.body).idade, null);
    return Response.json({ id: 42, idade: null });
  });
  await api.atualizarAluno(42, { idade: null });
});

test('codifica IDs e aceita DELETE com resposta 204 sem corpo', async () => {
  const api = criarApi('http://teste', async (url, options) => {
    assert.equal(url, 'http://teste/alunos/a%2Fb');
    assert.equal(options.method, 'DELETE');
    return new Response(null, { status: 204 });
  });
  assert.equal(await api.apagarAluno('a/b'), null);
});

test('propaga a mensagem de validação enviada pelo backend', async () => {
  const api = criarApi('http://teste', async () => Response.json({ error: 'O nome é obrigatório' }, { status: 400 }));
  await assert.rejects(api.adicionarAluno({}), /O nome é obrigatório/);
});

test('não confunde uma página HTML, um erro HTTP ou um objeto com uma lista de alunos', async () => {
  await assert.rejects(criarApi('http://teste', async () => new Response('<html>Erro</html>')).listarAlunos(), /JSON válida/);
  await assert.rejects(criarApi('http://teste', async () => new Response('Indisponível', { status: 503 })).listarCursos(), /HTTP 503/);
  await assert.rejects(criarApi('http://teste', async () => Response.json({ alunos: [] })).listarAlunos(), /formato inesperado/);
});

test('apresenta uma mensagem compreensível quando não há ligação', async () => {
  const api = criarApi('http://teste', async () => { throw new TypeError('Failed to fetch'); });
  await assert.rejects(api.listarCursos(), /Não foi possível contactar a API/);
});

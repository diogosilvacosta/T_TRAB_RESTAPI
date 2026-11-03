// O endereço pode ser alterado sem mexer nos componentes.
export const API_BASE = (
  import.meta.env?.VITE_API_URL?.trim() ||
  (import.meta.env?.DEV ? 'http://localhost:3000' : 'https://sir-restapi-at1.onrender.com/api')
).replace(/\/+$/, '');

export function idDe(aluno) {
  return aluno._id ?? aluno.id;
}

// Receber fetch como argumento também permite testar sem contactar a API real.
export function criarApi(baseUrl, fetcher = globalThis.fetch) {
  const base = baseUrl.replace(/\/+$/, '');

  async function pedido(caminho, method = 'GET', dados) {
    const options = { method };
    if (dados !== undefined) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(dados);
    }

    let resposta;
    try {
      resposta = await fetcher(`${base}${caminho}`, options);
    } catch {
      throw new Error('Não foi possível contactar a API. Verifica a ligação e se o servidor está a funcionar.');
    }

    const texto = await resposta.text();
    let resultado = null;
    if (texto) {
      try {
        resultado = JSON.parse(texto);
      } catch {
        if (!resposta.ok) throw new Error(`A API devolveu um erro (HTTP ${resposta.status}).`);
        throw new Error('A API não devolveu uma resposta JSON válida. Confirma o endereço configurado.');
      }
    }
    if (!resposta.ok) {
      throw new Error(resultado?.error || resultado?.message || `Erro na API (HTTP ${resposta.status}).`);
    }
    return resultado;
  }

  async function listar(caminho) {
    const lista = await pedido(caminho);
    if (!Array.isArray(lista)) throw new Error('A API devolveu uma lista num formato inesperado.');
    return lista;
  }

  const caminhoAluno = (id) => `/alunos/${encodeURIComponent(id)}`;

  return {
    listarCursos: () => listar('/cursos'),
    listarAlunos: () => listar('/alunos'),
    obterAluno: (id) => pedido(caminhoAluno(id)),
    adicionarAluno: (dados) => pedido('/alunos', 'POST', dados),
    atualizarAluno: (id, dados) => pedido(caminhoAluno(id), 'PUT', dados),
    apagarAluno: (id) => pedido(caminhoAluno(id), 'DELETE'),
  };
}

export const api = criarApi(API_BASE);
